import { Brain, Code2, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
	const features = [
		{
			icon: <Code2 className="h-10 w-10 text-primary" />,
			title: "Backend & Full-Stack",
			description:
				"Expertise in TypeScript, Python, Java, Node.js, Spring Boot, and React",
		},
		{
			icon: <Brain className="h-10 w-10 text-primary" />,
			title: "AI Infrastructure",
			description:
				"Building LLM-powered agents, synthetic data platforms, and AI-driven tools",
		},
		{
			icon: <Zap className="h-10 w-10 text-primary" />,
			title: "Fast Iteration",
			description:
				"Working fast, learning new domains, and building systems that scale",
		},
		{
			icon: <Users className="h-10 w-10 text-primary" />,
			title: "End-to-End Leadership",
			description:
				"Leading projects from OAuth flows to job schedulers across startup teams",
		},
	];

	return (
		<div className="w-full bg-muted/30">
			<section id="about" className="py-20 w-full">
				<div className="container px-4 md:px-6 mx-auto">
					<div className="space-y-12">
						<div className="space-y-4 text-center">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								About Me
							</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Software engineer with 5+ years of experience building backend
								systems, full-stack products, and AI tools. Based in London.
							</p>
						</div>

						<div className="mx-auto max-w-3xl text-center">
							<p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								I've led projects end-to-end at startups, from OAuth flows and
								job schedulers to LLM-based agents and developer tools. Lately,
								I've been focused on AI infrastructure and real-time backend
								systems. I like working fast, picking up new domains, and
								building clean, reliable systems that scale.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
							{features.map((feature) => (
								<div key={feature.title} className="animate-in">
									<Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
										<CardContent className="p-6 flex flex-col items-center text-center space-y-4">
											<div className="p-2 rounded-full bg-primary/10">
												{feature.icon}
											</div>
											<h3 className="text-xl font-bold">{feature.title}</h3>
											<p className="text-muted-foreground">
												{feature.description}
											</p>
										</CardContent>
									</Card>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
