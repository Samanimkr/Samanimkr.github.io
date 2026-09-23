"use client";

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";
import {
	type CSSProperties,
	Fragment,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { stackGroups } from "./stack-icons";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Decodes the text from random glyphs on load and again on hover. */
export function Scramble({ text }: { text: string }) {
	const [shown, setShown] = useState(text);
	const timer = useRef<ReturnType<typeof setInterval>>(undefined);

	const run = useCallback(() => {
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		clearInterval(timer.current);
		let tick = 0;
		timer.current = setInterval(() => {
			const settled = ++tick / 2;
			setShown(
				[...text]
					.map((c, i) =>
						c === " " || i < settled
							? c
							: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
					)
					.join(""),
			);
			if (settled >= text.length) clearInterval(timer.current);
		}, 35);
	}, [text]);

	useEffect(() => {
		run();
		return () => clearInterval(timer.current);
	}, [run]);

	return (
		<span onMouseEnter={run}>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true">{shown}</span>
		</span>
	);
}

/** Live London time, ticking. Empty on the server so hydration can't mismatch. */
export function Clock() {
	const [now, setNow] = useState("");
	useEffect(() => {
		const fmt = new Intl.DateTimeFormat("en-GB", {
			timeZone: "Europe/London",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
		const tick = () => setNow(fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);
	return <span className="tabular-nums">{now}</span>;
}

/** Pulls its child toward the cursor while hovered. */
export function Magnetic({ children }: { children: ReactNode }) {
	const reduce = useReducedMotion();
	const spring = { stiffness: 250, damping: 18, mass: 0.4 };
	const x = useSpring(0, spring);
	const y = useSpring(0, spring);
	return (
		<motion.span
			className="inline-block"
			style={{ x, y }}
			onPointerMove={(e) => {
				if (reduce || e.pointerType !== "mouse") return;
				const r = e.currentTarget.getBoundingClientRect();
				x.set((e.clientX - r.left - r.width / 2) * 0.3);
				y.set((e.clientY - r.top - r.height / 2) * 0.3);
			}}
			onPointerLeave={() => {
				x.set(0);
				y.set(0);
			}}
		>
			{children}
		</motion.span>
	);
}

const swap = {
	initial: { opacity: 0, y: 6, filter: "blur(4px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: { opacity: 0, y: -6, filter: "blur(4px)" },
	transition: { duration: 0.18 },
};

/** Click to copy; falls back to mailto where the clipboard is unavailable. */
export function CopyEmail({ email }: { email: string }) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			type="button"
			title="Copy email"
			className="link cursor-copy text-[#0b5cff]"
			onClick={() =>
				navigator.clipboard.writeText(email).then(
					() => {
						setCopied(true);
						setTimeout(() => setCopied(false), 1800);
					},
					() => {
						location.href = `mailto:${email}`;
					},
				)
			}
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span key={String(copied)} className="inline-block" {...swap}>
					{copied ? "Copied to clipboard" : email}
				</motion.span>
			</AnimatePresence>
			<span aria-live="polite" className="sr-only">
				{copied ? "Email copied" : ""}
			</span>
		</button>
	);
}

type Job = {
	role: string;
	company: string;
	href: string;
	preview: string;
	period: string;
	points: string[];
};

// "**x**" marks a metric: bold, with a highlighter that sweeps in on scroll.
function Point({ text }: { text: string }) {
	return text.split("**").map((part, i) =>
		i % 2 ? (
			<strong key={part} className="metric">
				{part}
			</strong>
		) : (
			part
		),
	);
}

const PREVIEW_HALF_HEIGHT = 76; // w-72 at 1200×630

/**
 * Experience list. On wide mouse screens a preview of the hovered job's product
 * glides along the right margin, tilting with its speed; elsewhere each job
 * shows its preview inline.
 */
export function Experience({ jobs }: { jobs: Job[] }) {
	const [active, setActive] = useState<number | null>(null);
	const list = useRef<HTMLOListElement>(null);
	const reduce = useReducedMotion();
	const target = useMotionValue(0);
	const smooth = useSpring(target, { stiffness: 220, damping: 26, mass: 0.6 });
	const rotate = useTransform(useVelocity(smooth), [-1200, 1200], [-7, 7], {
		clamp: true,
	});

	// Floating previews mount on hover; warm the cache so the first one isn't blank.
	useEffect(() => {
		if (!matchMedia("(min-width: 1280px) and (hover: hover)").matches) return;
		for (const job of jobs) new Image().src = job.preview;
	}, [jobs]);

	const place = (clientY: number, jump: boolean) => {
		const top = list.current?.getBoundingClientRect().top ?? 0;
		target.set(clientY - top - PREVIEW_HALF_HEIGHT);
		if (jump) smooth.jump(target.get());
	};

	return (
		<div className="relative">
			<ol
				ref={list}
				className="jobs space-y-10"
				onPointerMove={(e) => place(e.clientY, false)}
				onPointerLeave={() => setActive(null)}
			>
				{jobs.map((job, i) => (
					<li
						key={job.company}
						className="transition-opacity duration-300"
						onPointerEnter={(e) => {
							if (active === null) place(e.clientY, true);
							setActive(i);
						}}
					>
						<div className="reveal">
							<div className="flex flex-wrap items-baseline justify-between gap-x-4">
								<h3 className="font-medium">
									{job.role}
									<span className="text-neutral-500"> · </span>
									<a
										href={job.href}
										target="_blank"
										rel="noreferrer"
										className="link text-neutral-500 hover:text-neutral-900"
									>
										{job.company}
									</a>
								</h3>
								<span className="text-sm tabular-nums text-neutral-400">
									{job.period}
								</span>
							</div>
							<img
								src={job.preview}
								alt={`${job.company} website`}
								loading="lazy"
								width={1200}
								height={630}
								className="preview-inline mt-4 h-auto w-full rounded-lg border border-neutral-200"
							/>
							<ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700 marker:text-neutral-300">
								{job.points.map((point) => (
									<li key={point} className="leading-relaxed">
										<Point text={point} />
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ol>

			<motion.div
				aria-hidden="true"
				className="preview-float pointer-events-none absolute left-full top-0 ml-6 w-72"
				style={{ y: reduce ? target : smooth, rotate: reduce ? 0 : rotate }}
			>
				<AnimatePresence>
					{active !== null && (
						<motion.img
							key={jobs[active].preview}
							src={jobs[active].preview}
							alt=""
							className="absolute inset-x-0 top-0 h-auto w-full rounded-lg border border-neutral-200 shadow-2xl shadow-black/15"
							initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
							animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
							transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}

type Command = { group: string; label: string; href: string };

/**
 * ⌘K / Ctrl+K menu on a native <dialog> (Esc, focus trap and backdrop come free).
 * href schemes: "#id" scrolls, "copy:text" copies, http(s) opens a tab, else navigates.
 */
export function CommandPalette({ commands }: { commands: Command[] }) {
	const dialog = useRef<HTMLDialogElement>(null);
	const [query, setQuery] = useState("");
	const [index, setIndex] = useState(0);
	const [shortcut, setShortcut] = useState("⌘K");
	const [toast, setToast] = useState("");

	const q = query.trim().toLowerCase();
	const results = commands.filter((c) =>
		`${c.group} ${c.label}`.toLowerCase().includes(q),
	);

	useEffect(() => {
		if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcut("Ctrl K");
		const onKey = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
			e.preventDefault();
			const d = dialog.current;
			if (d) d.open ? d.close() : d.showModal();
		};
		addEventListener("keydown", onKey);
		return () => removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		document.getElementById(`cmd-${index}`)?.scrollIntoView({ block: "nearest" });
	}, [index]);

	const notify = (text: string) => {
		setToast(text);
		setTimeout(() => setToast(""), 1800);
	};

	const run = (c: Command) => {
		dialog.current?.close();
		if (c.href.startsWith("copy:")) {
			navigator.clipboard
				.writeText(c.href.slice(5))
				.then(() => notify("Email copied"), () => notify("Couldn't copy"));
		} else if (c.href.startsWith("#")) {
			// Next frame: close() restores focus, which cancels a same-tick smooth scroll.
			requestAnimationFrame(() =>
				document.querySelector(c.href)?.scrollIntoView({ behavior: "smooth" }),
			);
		} else if (c.href.startsWith("http")) {
			window.open(c.href, "_blank", "noopener");
		} else {
			location.href = c.href;
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={() => dialog.current?.showModal()}
				aria-label="Open command menu"
				className="rise fixed bottom-5 right-5 z-40 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-xs text-neutral-500 shadow-sm backdrop-blur transition-colors hover:text-neutral-900"
				style={{ "--i": 8 } as CSSProperties}
			>
				<kbd className="hidden font-sans [@media(hover:hover)]:inline">
					{shortcut}
				</kbd>
				<span className="[@media(hover:hover)]:hidden">Menu</span>
			</button>

			<dialog
				ref={dialog}
				aria-label="Command menu"
				className="palette"
				onClose={() => {
					setQuery("");
					setIndex(0);
				}}
				onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
			>
				<input
					autoFocus
					role="combobox"
					aria-expanded="true"
					aria-controls="cmd-list"
					aria-activedescendant={results.length ? `cmd-${index}` : undefined}
					placeholder="Type a command or search…"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setIndex(0);
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown" || e.key === "ArrowUp") {
							e.preventDefault();
							const step = e.key === "ArrowDown" ? 1 : -1;
							setIndex((i) => Math.min(Math.max(i + step, 0), results.length - 1));
						}
						if (e.key === "Enter" && results[index]) run(results[index]);
					}}
					className="w-full border-b border-neutral-200 bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-neutral-400"
				/>
				<ul id="cmd-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
					{results.map((c, i) => (
						<Fragment key={c.label}>
							{c.group !== results[i - 1]?.group && (
								<li role="presentation" className="px-3 pb-1 pt-3 text-xs text-neutral-400">
									{c.group}
								</li>
							)}
							<li
								id={`cmd-${i}`}
								role="option"
								aria-selected={i === index}
								onPointerMove={() => setIndex(i)}
								onClick={() => run(c)}
								className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-neutral-700 aria-selected:bg-neutral-100 aria-selected:text-neutral-900"
							>
								{c.label}
								<span aria-hidden="true" className="text-neutral-400">
									{c.href.startsWith("http") ? "↗" : c.href.startsWith("#") ? "↓" : ""}
								</span>
							</li>
						</Fragment>
					))}
					{!results.length && (
						<li className="px-3 py-8 text-center text-sm text-neutral-400">
							Nothing matches “{query}”
						</li>
					)}
				</ul>
			</dialog>

			<AnimatePresence>
				{toast && (
					<motion.div
						role="status"
						className="fixed bottom-5 left-1/2 z-50 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg"
						style={{ x: "-50%" }}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 12 }}
					>
						{toast}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

const DRAW_STEP_MS = 70; // stagger between logos
const DRAW_MS = 1300 + 900; // one logo's outline + fill, see .stack in globals.css

function StackGroups() {
	let k = 0;
	return stackGroups.map(({ group, skills }) => (
		<div key={group} className="sm:flex sm:gap-6">
			<div className="mb-3 w-32 shrink-0 pt-1.5 text-neutral-500 sm:mb-0">{group}</div>
			<ul className="flex flex-wrap gap-x-3 gap-y-5">
				{skills.map((s) => (
					<li
						key={s.name}
						className={s.line ? "skill line" : "skill"}
						style={{ "--c": s.color, "--d": `${k++ * DRAW_STEP_MS}ms` } as CSSProperties}
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d={s.path} pathLength={1} />
						</svg>
						<span>{s.name}</span>
					</li>
				))}
			</ul>
		</div>
	));
}

/**
 * Skill logos draw themselves in when the section scrolls into view. Then, on
 * mouse screens, a torch follows the cursor revealing brand colours; on touch
 * screens the logos simply fill in their brand colours (see .stack in CSS).
 */
export function Stack() {
	const ref = useRef<HTMLDivElement>(null);
	// static = server render / no JS: everything visible, no torch
	const [state, setState] = useState<"static" | "idle" | "play" | "done">("static");

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setState("done");
			return;
		}
		setState("idle");
		let timer: ReturnType<typeof setTimeout>;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				setState("play");
				const count = stackGroups.reduce((n, g) => n + g.skills.length, 0);
				timer = setTimeout(() => setState("done"), count * DRAW_STEP_MS + DRAW_MS);
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => {
			io.disconnect();
			clearTimeout(timer);
		};
	}, []);

	return (
		<div
			ref={ref}
			data-state={state}
			className="stack"
			onPointerMove={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
				e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
			}}
		>
			<div className="space-y-7">
				<StackGroups />
			</div>
			<div aria-hidden="true" className="torch space-y-7">
				<StackGroups />
			</div>
		</div>
	);
}
