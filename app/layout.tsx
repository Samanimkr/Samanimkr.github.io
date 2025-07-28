import type { Metadata } from "next";
import type React from "react";
import ClientLayout from "./client";
import "@/styles/globals.css"; // Import globals.css here

export const metadata: Metadata = {
	metadataBase: new URL('https://samanimkr.github.io'),
	title: "Samani Mukhtar | Software Engineer",
	description:
		"Portfolio of Samani Mukhtar, a Software Engineer specializing in backend systems, AI infrastructure, and full-stack development.",
	keywords: [
		"Samani Mukhtar",
		"Software Engineer",
		"Backend Systems",
		"AI Infrastructure",
		"TypeScript",
		"Python",
		"Java",
		"Node.js",
	],
	authors: [{ name: "Samani Mukhtar" }],
	creator: "Samani Mukhtar",
	icons: {
		icon: [{ url: "/favicon.png", type: "image/png" }],
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://samanimkr.github.io",
		title: "Samani Mukhtar | Software Engineer",
		description:
			"Portfolio of Samani Mukhtar, a Senior Software Engineer specializing in backend systems, AI infrastructure, and full-stack development.",
		siteName: "Samani Mukhtar Portfolio",
		images: [
			{
				url: "/favicon.png",
				width: 512,
				height: 512,
				alt: "Samani Mukhtar Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Samani Mukhtar | Software Engineer",
		description:
			"Portfolio of Samani Mukhtar, a Senior Software Engineer specializing in backend systems, AI infrastructure, and full-stack development.",
		creator: "@samanimukhtar",
		images: ["/favicon.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ClientLayout>{children}</ClientLayout>;
}
