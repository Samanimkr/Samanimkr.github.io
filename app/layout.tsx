import type { Metadata } from "next";
import type React from "react";
import "@/styles/globals.css";

const title = "Samani Mukhtar | Software Engineer";
const description =
	"Full-stack engineer and founder in London. Builder of PolyFundr, previously Turo and RhinestoneAI.";

export const metadata: Metadata = {
	metadataBase: new URL("https://samanimkr.github.io"),
	title,
	description,
	authors: [{ name: "Samani Mukhtar" }],
	creator: "Samani Mukhtar",
	icons: { icon: [{ url: "/favicon.png", type: "image/png" }] },
	manifest: "/manifest.json",
	openGraph: {
		type: "website",
		url: "https://samanimkr.github.io",
		title,
		description,
		siteName: "Samani Mukhtar",
		images: [{ url: "/favicon.png", width: 512, height: 512, alt: "Samani Mukhtar" }],
	},
	twitter: { card: "summary", title, description, images: ["/favicon.png"] },
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-white text-neutral-900 antialiased">{children}</body>
		</html>
	);
}
