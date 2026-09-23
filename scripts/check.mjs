// Real-input smoke test of the page's interactions in headless Chrome, over the DevTools protocol.
// With `npm run dev` running:  node scripts/check.mjs   (Node 21: add --experimental-websocket)
// Env: URL (default http://localhost:3000/), CHROME (path to a Chrome/Chromium binary).
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
setTimeout(() => { console.log("timed out"); process.exit(2); }, 60000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9900 + Math.floor(Math.random() * 90);
const URL = process.env.URL ?? "http://localhost:3000/";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const proc = spawn(CHROME, [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "check-"))}`, "--window-size=1440,900", "about:blank"], { stdio: "ignore" });
let ws;
for (let i = 0; i < 100 && !ws; i++) {
  try { ws = new WebSocket((await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page").webSocketDebuggerUrl); }
  catch { await sleep(200); }
}
await new Promise((r) => (ws.onopen = r));
let n = 0; const waiting = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); waiting.get(m.id)?.(m.result); waiting.delete(m.id); };
const send = (method, params = {}) => new Promise((r) => { waiting.set(++n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const js = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }))?.result?.value;
const key = async (key, code, vk, modifiers = 0) => {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: vk, modifiers });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: vk, modifiers });
};
const move = (x, y) => send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
const results = {};
const check = (name, ok, detail) => { results[name] = ok ? "PASS" : `FAIL ${JSON.stringify(detail)}`; };

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL });
for (let t = 0; t < 40; t++) { await sleep(500); if ((await js(`document.readyState === "complete" && !!document.querySelector("main")`)) === true) break; }
await sleep(2000);
check("visible + 60fps", await js(`new Promise(r => { let f = 0; const t = performance.now(); (function tick() { f++; performance.now() - t < 500 ? requestAnimationFrame(tick) : r(document.visibilityState === "visible" && f > 20); })(); })`), "");

// ⌘K opens with focus in the search box
await key("k", "KeyK", 75, 4);
await sleep(400);
const opened = await js(`({ open: document.querySelector("dialog.palette").open, focus: document.activeElement.tagName })`);
check("cmd+k opens, input focused", opened.open && opened.focus === "INPUT", opened);

// typing filters, Enter jumps to the section with a smooth scroll
await send("Input.insertText", { text: "educ" });
await sleep(200);
const options = await js(`[...document.querySelectorAll("[role=option]")].map(o => o.textContent)`);
check("filter to Education", options.length === 1 && options[0].startsWith("Education"), options);
await key("Enter", "Enter", 13);
await sleep(1600);
const jumped = await js(`({ open: document.querySelector("dialog.palette").open, scrollY, top: Math.round(document.getElementById("education").getBoundingClientRect().top) })`);
check("Enter closes + scrolls to Education", !jumped.open && jumped.scrollY > 1000, jumped);

// ⌘K toggles closed; Esc closes
await key("k", "KeyK", 75, 4); await sleep(300); await key("k", "KeyK", 75, 4); await sleep(300);
check("cmd+k toggles closed", !(await js(`document.querySelector("dialog.palette").open`)), "");

// Hovering a job shows its floating preview in the margin and dims the others
await js(`scrollTo(0, 0)`); await sleep(500);
const turo = await js(`(() => { const r = [...document.querySelectorAll(".jobs > li")][1].getBoundingClientRect(); return { x: r.left + 100, y: r.top + 40 }; })()`);
await move(turo.x, turo.y - 30); await move(turo.x, turo.y); await sleep(700);
const hover = await js(`(() => { const img = document.querySelector(".preview-float img"); const lis = [...document.querySelectorAll(".jobs > li")]; return { src: img?.getAttribute("src"), opacity: img && getComputedStyle(img).opacity, x: img && Math.round(img.getBoundingClientRect().left), dimmed: lis.map(li => getComputedStyle(li).opacity) }; })()`);
check("hover shows Turo preview in margin", hover.src === "/previews/turo.webp" && hover.x > 1000 && +hover.opacity > 0.9, hover);
check("other jobs dim", hover.dimmed[1] === "1" && hover.dimmed[0] === "0.35", hover.dimmed);

// Scramble settles on the real name, clock ticks in London time
check("name settles", (await js(`document.querySelector("h1 [aria-hidden]").textContent`)) === "Samani Mukhtar", "");
const clock = await js(`document.querySelector("h1 + p .tabular-nums").textContent`);
check("clock renders HH:MM:SS", /^\d\d:\d\d:\d\d$/.test(clock), clock);

// Nothing overflows horizontally
check("no horizontal overflow", await js(`document.documentElement.scrollWidth <= innerWidth`), "");

console.log(JSON.stringify(results, null, 2));
proc.kill("SIGKILL"); process.exit(Object.values(results).every((v) => v === "PASS") ? 0 : 1);
