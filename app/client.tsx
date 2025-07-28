"use client";

import { Mona_Sans as FontSans } from "next/font/google";
import type React from "react";
import AnimatedBackground from "@/components/animated-background";
import Footer from "@/components/footer";
import Header from "@/components/header";
import NoScriptStyles from "@/components/noscript-styles";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<NoScriptStyles />
				<link rel="manifest" href="/manifest.json" />
				<style jsx global>{`
          :root {
            --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }
          
          body {
            font-family: var(--font-mono);
          }
        `}</style>
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-mono antialiased",
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					<div className="relative flex min-h-screen flex-col overflow-hidden">
						<noscript>
							<div className="bg-yellow-100 dark:bg-yellow-900 p-4 text-center text-sm">
								For the best experience, please enable JavaScript. Some features
								may be limited without it.
							</div>
						</noscript>
						<AnimatedBackground />
						<Header />
						<main className="flex-1 relative z-10">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
