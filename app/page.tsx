import type { CSSProperties, ReactNode } from "react";
import {
	Clock,
	CommandPalette,
	CopyEmail,
	Experience,
	Magnetic,
	Scramble,
} from "./interactive";

const EMAIL = "samanimkr@outlook.com";

// "**x**" in a point marks a metric (see Point in ./interactive).
const jobs = [
	{
		role: "Founder",
		company: "PolyFundr",
		href: "https://polyfundr.com",
		preview: "/previews/polyfundr.webp",
		period: "May 2026 — Present",
		points: [
			"Built and launched a prediction-market trader funding platform as sole engineer, reaching **5,000 users** and **$100K+ ARR**, with 500 paid evaluations and $15K in trader payouts.",
			"Built evaluation and risk systems, trading workflows and admin tooling in NestJS, Next.js, PostgreSQL and WebSockets, with error handling that kept the service up through Polymarket API failures.",
			"Owned product, launch and marketing alongside sole responsibility for engineering.",
		],
	},
	{
		role: "Senior Software Engineer",
		company: "Turo",
		href: "https://turo.com",
		preview: "/previews/turo.webp",
		period: "Oct 2024 — May 2026",
		points: [
			"Built Kubernetes infrastructure across all environments and custom OAuth flows for the migration to WSO2, supporting **3.5M users** across web, iOS and Android.",
			"Led Login with Uber from design through rollout, delivering a **25% lift in driver conversion** for an integration serving 100K+ renters.",
			"Shipped passwordless Autologin for single-page checkout — **80% of new drivers** now book through it — plus deferred deep linking that survives app installation.",
		],
	},
	{
		role: "Co-Founder & CTO",
		company: "MonteloAI",
		// montelo.ai now belongs to someone else; link the 2024 snapshot.
		href: "https://web.archive.org/web/2024/https://www.montelo.ai/",
		preview: "/previews/montelo.webp",
		period: "Mar 2024 — Oct 2024",
		points: [
			"Onboarded 3 paying customers, reaching **five-digit ARR in 4 months**.",
			"Deployed serverless fine-tuning pipelines for open-source LLMs using Axolotl and Modal.",
			"Built synthetic-data generation on BullMQ queues and cron jobs, plus A/B testing to compare fine-tuned model variants on the same input.",
		],
	},
	{
		role: "Founding Engineer",
		company: "RhinestoneAI (now Steel)",
		href: "https://steel.dev",
		preview: "/previews/rhinestone.webp",
		period: "Jul 2023 — Mar 2024",
		points: [
			"Built a natural-language AI search engine for the crypto market: text-to-SQL with multi-agent RAG selecting from **50+ tools**.",
			"Enabled **sub-second aggregations across billions of rows** using Rockset, with vector-database query caching.",
			"Shipped the frontend and a custom command palette with Next.js, Radix UI and TypeScript.",
		],
	},
	{
		role: "Senior Software Engineer",
		company: "Railvision Analytics",
		href: "https://www.railvision.ca/en/",
		preview: "/previews/railvision.webp",
		period: "Jan 2023 — Jul 2023",
		points: [
			"Rebuilt the GraphQL API from scratch to support real-time AI data and frontend requirements.",
		],
	},
	{
		role: "Intermediate Software Engineer",
		company: "Clutch",
		href: "https://www.clutch.ca",
		preview: "/previews/clutch.webp",
		period: "Aug 2021 — Jan 2023",
		points: [
			"Designed distributed job scheduling with Kafka, RabbitMQ and AWS for ML training and email delivery.",
			"Increased event-processing throughput **5x** by optimizing event streaming infrastructure and Elasticsearch.",
			"Reworked delivery and pickup scheduling, cutting reschedules by **45%** and lifting checkout conversion by **20%**.",
		],
	},
	{
		role: "Software Engineer",
		company: "TrustedHousesitters",
		href: "https://www.trustedhousesitters.com",
		preview: "/previews/trustedhousesitters.webp",
		period: "Sep 2018 — Sep 2019",
		points: [
			"Built features across the React Native mobile and web apps, including Google Maps with custom pins and clustering.",
			"Set up end-to-end testing with Detox and increased unit test coverage by **more than 20%** across the codebase.",
			"Set up native app linking on iOS and Android, so links open straight into the app.",
		],
	},
];

const stack = [
	["Languages", "TypeScript, JavaScript, Java, Python, SQL"],
	[
		"Application",
		"React, Next.js, NestJS, Node.js, Spring Boot, PostgreSQL, MongoDB, GraphQL, WebSockets",
	],
	["Infrastructure", "Kubernetes, Docker, Terraform, AWS, Argo CD, GitHub Actions, New Relic"],
	["Systems", "OAuth 2.0, WSO2, Kafka, RabbitMQ, RAG, vector databases"],
];

const links = [
	{ label: "GitHub", href: "https://github.com/Samanimkr" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/samani-mukhtar" },
	{ label: "Résumé", href: "/samani_mukhtar_resume.pdf" },
];

const sections = ["Experience", "Stack", "Education", "Contact"];

const commands = [
	{ group: "Contact", label: "Email me", href: `mailto:${EMAIL}` },
	{ group: "Contact", label: "Copy email address", href: `copy:${EMAIL}` },
	...links.map((l) => ({ group: "Links", ...l })),
	...sections.map((s) => ({ group: "Jump to", label: s, href: `#${s.toLowerCase()}` })),
	...jobs.map((j) => ({ group: "Work", label: j.company, href: j.href })),
];

// Place in the staggered load-in (.rise)
const order = (i: number) => ({ "--i": i }) as CSSProperties;

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section id={title.toLowerCase()} className="scroll-mt-10 border-t border-neutral-200 pt-10">
			<h2 className="reveal mb-8 text-sm font-semibold tracking-wide text-neutral-900">
				{title}
			</h2>
			{children}
		</section>
	);
}

export default function Home() {
	return (
		<>
			<div
				aria-hidden="true"
				className="progress fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[#0b5cff]"
			/>
			<main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
				<header className="pb-10">
					<h1 className="rise text-2xl font-semibold tracking-tight" style={order(0)}>
						<Scramble text="Samani Mukhtar" />
					</h1>
					<p className="rise mt-1 text-neutral-500" style={order(1)}>
						Full-stack engineer and founder. London, UK{" "}
						<span className="text-neutral-300">·</span> <Clock />
					</p>
					<p className="rise mt-6 leading-relaxed text-neutral-700" style={order(2)}>
						I build products end to end with TypeScript, Next.js and PostgreSQL. Most recently I
						took PolyFundr from nothing to 5,000 users and $100K+ ARR as the sole engineer. Before
						that I led growth integrations and an OAuth migration at Turo, co-founded MonteloAI, and
						built AI-powered analytics as a founding engineer at RhinestoneAI.
					</p>
					<div
						className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
						style={order(3)}
					>
						<Magnetic>
							<a
								href={`mailto:${EMAIL}`}
								className="block rounded-md bg-[#0b5cff] px-4 py-2 font-medium text-white shadow-[0_6px_20px_-6px_rgb(11_92_255/0.6)] transition-colors hover:bg-[#0a4fd9]"
							>
								Get in touch
							</a>
						</Magnetic>
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="link text-neutral-500 hover:text-neutral-900"
							>
								{link.label}
							</a>
						))}
					</div>
				</header>

				<div className="rise space-y-10" style={order(4)}>
					<Section title="Experience">
						<Experience jobs={jobs} />
					</Section>

					<Section title="Stack">
						<dl className="space-y-3">
							{stack.map(([label, value]) => (
								<div key={label} className="reveal sm:flex sm:gap-6">
									<dt className="w-32 shrink-0 text-neutral-500">{label}</dt>
									<dd className="text-neutral-700">{value}</dd>
								</div>
							))}
						</dl>
					</Section>

					<Section title="Education">
						<div className="reveal flex flex-wrap items-baseline justify-between gap-x-4">
							<p className="font-medium">
								University of Bristol, UK
								<span className="text-neutral-500"> · Computer Science with Innovation</span>
							</p>
							<span className="text-sm tabular-nums text-neutral-400">2019 — 2022</span>
						</div>
					</Section>

					<Section title="Contact">
						<p className="reveal text-neutral-700">
							Open to interesting problems. <CopyEmail email={EMAIL} />
						</p>
					</Section>
				</div>

				<footer className="mt-10 border-t border-neutral-200 pt-8 text-sm text-neutral-400">
					© {new Date().getFullYear()} Samani Mukhtar
				</footer>
			</main>
			<CommandPalette commands={commands} />
		</>
	);
}
