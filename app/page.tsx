import type { Metadata } from "next";
import About from "@/components/about";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Hero from "@/components/hero";

export const metadata: Metadata = {
	title: "Samani Mukhtar | Software Engineer",
	description:
		"Portfolio of Samani Mukhtar, a Software Engineer specializing in backend systems, AI infrastructure, and full-stack development.",
};

export default function Home() {
	return (
		<div className="w-full">
			<Hero />
			<About />
			<Experience />
			<Education />
			<Contact />
		</div>
	);
}
