import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function SkillsContent() {
	const skillCategories = [
		{
			category: "Languages",
			skills: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL"],
		},
		{
			category: "Front-end",
			skills: ["React.js", "Next.js", "React Native"],
		},
		{
			category: "Back-end",
			skills: [
				"Node.js",
				"Spring Boot",
				"PostgreSQL",
				"MongoDB",
				"Kafka",
				"RabbitMQ",
				"OAuth2",
			],
		},
		{
			category: "Tools",
			skills: [
				"Terraform",
				"Git",
				"Docker",
				"Github Actions",
				"AWS",
				"New Relic",
			],
		},
		{
			category: "AI/LLMs",
			skills: ["Claude Code", "Axolotl", "Modal", "RAG systems", "Vector DBs"],
		},
	];

	return (
		<div>
			<div className="space-y-4 text-center">
				<h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
					Skills
				</h3>
				<p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
					My technical expertise and tools
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{skillCategories.map((category) => (
					<div key={category.category} className="skill-card">
						<Card className="h-full border-t-4 border-t-primary">
							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-4">{category.category}</h3>
								<div className="flex flex-wrap gap-2">
									{category.skills.map((skill) => (
										<Badge key={skill} variant="secondary" className="text-sm">
											{skill}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}
