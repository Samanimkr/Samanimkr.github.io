import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Skills from "./skills-content";

export default function Experience() {
	const experiences = [
		{
			title: "Senior Software Engineer",
			company: "Turo",
			companyUrl: "https://turo.com",
			period: "Oct 2024 - Present",
			location: "London, UK",
			technologies: [
				"OAuth2",
				"Java",
				"Spring Boot",
				"New Relic",
				"Deep Linking",
			],
			achievements: [
				"Integrated Uber login and account-linking APIs",
				"Designed authentication flows (OAuth2, deep linking, passwordless login) across platforms",
				"Consolidated OAuth flow documentation and built internal dashboards to monitor token usage and reduce auth errors",
			],
		},
		{
			title: "Co-Founder & CTO",
			company: "MonteloAI",
			period: "Mar 2024 - Present",
			location: "Toronto, CA",
			technologies: [
				"Axolotl",
				"Modal",
				"BullMQ",
				"LLMs",
				"TypeScript",
				"Cron Jobs",
			],
			achievements: [
				"5-digit ARR in 4 months",
				"Deployed serverless fine-tuning pipelines for open-source LLMs using Axolotl and Modal",
				"Designed an intuitive UI to generate synthetic data; built on BullMQ queues & cron jobs",
				"Empowered users to easily collect, annotate, and organize custom datasets for model training",
				"Developed an A/B testing system for models, allowing users to compare and optimize multiple fine-tuned model variants simultaneously",
			],
		},
		{
			title: "Founding Engineer",
			company: "RhinestoneAI",
			companyUrl: "https://rhinestone.ai/",
			period: "Jul 2023 - Mar 2024",
			location: "Toronto, CA",
			technologies: [
				"RAG",
				"Rockset",
				"Next.js",
				"TypeScript",
				"SQL",
				"OpenAI API",
			],
			achievements: [
				"Developed a text-to-SQL system using multi-agent RAG architecture to select from 50+ tools",
				"Used NoSQL (Rockset) for data storage, allowing < 1s aggregations on billions of rows",
				"Designed query caching for complex SQL queries using a vector db, significantly improved performance",
				"Shipped the frontend and a custom CmdK implementation with Next.js, RadixUI, & TypeScript",
			],
		},
		{
			title: "Senior Software Engineer",
			company: "Railvision Analytics",
			companyUrl: "https://www.railvision.ca/en/",
			period: "Jan 2023 - Jul 2023",
			location: "Toronto, CA",
			technologies: ["GraphQL", "Flask", "SQL"],
			achievements: [
				"Rebuilt GraphQL API from scratch to support real-time AI data and frontend teams' needs",
			],
		},
		{
			title: "Intermediate Software Engineer",
			company: "Clutch",
			companyUrl: "https://clutch.ca",
			period: "Aug 2021 - Jan 2023",
			location: "Toronto, CA",
			technologies: ["Kafka", "RabbitMQ", "AWS", "Elasticsearch"],
			achievements: [
				"Designed a distributed job scheduling system (Kafka, RabbitMQ, AWS) for ML training and emails",
				"Optimized event streaming infrastructure and Elasticsearch, improving performance by 5x",
				"Integrated multiple third-party services across internal tools and external apps",
			],
		},
	];

	return (
		<section id="experience" className="py-20">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="space-y-12">
					<div className="space-y-4 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Experience
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							My professional journey and key accomplishments
						</p>
					</div>

					<div className="space-y-8 mt-12">
						{experiences.map((experience) => (
							<div
								key={`${experience.title}-${experience.company}`}
								className="timeline-item"
							>
								<Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
									<CardContent className="p-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
											<div>
												<h3 className="text-xl font-bold">
													{experience.title}
												</h3>
												{experience.companyUrl ? (
													<a
														href={experience.companyUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="text-muted-foreground hover:text-primary transition-colors hover:underline inline-flex items-center gap-1"
													>
														{experience.company}
														<ExternalLink className="h-3 w-3" />
													</a>
												) : (
													<p className="text-muted-foreground">
														{experience.company}
													</p>
												)}
											</div>
											<div className="mt-2 md:mt-0 flex flex-col md:items-end">
												<Badge variant="outline" className="mb-1 md:mb-0 w-fit">
													{experience.period}
												</Badge>
												<span className="text-sm text-muted-foreground">
													{experience.location}
												</span>
											</div>
										</div>
										<div className="mt-4 space-y-4">
											<div className="flex flex-wrap gap-2">
												{experience.technologies.map((tech) => (
													<Badge
														key={tech}
														variant="secondary"
														className="text-xs"
													>
														{tech}
													</Badge>
												))}
											</div>
											<ul className="space-y-2">
												{experience.achievements.map((achievement) => (
													<li key={achievement} className="flex items-start">
														<span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
														<span className="text-sm text-muted-foreground">
															{achievement}
														</span>
													</li>
												))}
											</ul>
										</div>
									</CardContent>
								</Card>
							</div>
						))}
					</div>

					{/* Skills Section */}
					<div className="mt-20" id="skills">
						<Skills />
					</div>
				</div>
			</div>
		</section>
	);
}
