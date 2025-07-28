import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
	const contactInfo = [
		{
			icon: <Mail className="h-6 w-6 text-primary" />,
			title: "Email",
			value: "samanimkr@outlook.com",
			link: "mailto:samanimkr@outlook.com",
		},
		{
			icon: <MapPin className="h-6 w-6 text-primary" />,
			title: "Location",
			value: "London, UK",
			link: "https://maps.google.com/?q=London,UK",
		},
		{
			icon: <Phone className="h-6 w-6 text-primary" />,
			title: "Phone",
			value: "Available on request",
			link: null,
		},
	];

	return (
		<section id="contact" className="py-20">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="space-y-12">
					<div className="space-y-4 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Get In Touch
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Have a project in mind or want to discuss opportunities? I'd love
							to hear from you!
						</p>
					</div>

					<div className="mt-12">
						{/* Desktop: Horizontal layout */}
						<div className="hidden md:grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
							{contactInfo.map((info) => (
								<Card key={info.title} className="overflow-hidden">
									<CardContent className="p-6 text-center">
										<div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
											{info.icon}
										</div>
										<h3 className="font-medium mb-2">{info.title}</h3>
										{info.link ? (
											<a
												href={info.link}
												className="text-muted-foreground hover:text-primary transition-colors text-sm"
												target={
													info.title === "Location" ? "_blank" : undefined
												}
												rel={
													info.title === "Location"
														? "noopener noreferrer"
														: undefined
												}
											>
												{info.value}
											</a>
										) : (
											<p className="text-muted-foreground text-sm">
												{info.value}
											</p>
										)}
									</CardContent>
								</Card>
							))}

							<Card>
								<CardContent className="p-6 text-center">
									<h3 className="font-medium mb-2">Connect with me</h3>
									<p className="text-sm text-muted-foreground mb-4">
										Find me on these platforms
									</p>
									<div className="flex justify-center gap-2">
										<Button variant="outline" size="icon" asChild>
											<a
												href="https://github.com/Samanimkr"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-4 w-4"
												>
													<title>GitHub</title>
													<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
													<path d="M9 18c-4.51 2-5-2-7-2"></path>
												</svg>
												<span className="sr-only">GitHub</span>
											</a>
										</Button>
										<Button variant="outline" size="icon" asChild>
											<a
												href="https://www.linkedin.com/in/samani-mukhtar/"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-4 w-4"
												>
													<title>LinkedIn</title>
													<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
													<rect width="4" height="12" x="2" y="9"></rect>
													<circle cx="4" cy="4" r="2"></circle>
												</svg>
												<span className="sr-only">LinkedIn</span>
											</a>
										</Button>
										<Button variant="outline" size="icon" asChild>
											<a href="mailto:samanimkr@outlook.com">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-4 w-4"
												>
													<title>Email</title>
													<rect
														width="20"
														height="16"
														x="2"
														y="4"
														rx="2"
													></rect>
													<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
												</svg>
												<span className="sr-only">Email</span>
											</a>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Mobile: Vertical layout with bottom margin to prevent arrow overlap */}
						<div className="md:hidden space-y-6 max-w-md mx-auto mb-20">
							{contactInfo.map((info) => (
								<Card key={info.title} className="overflow-hidden">
									<CardContent className="p-6 flex items-start gap-4">
										<div className="bg-primary/10 p-3 rounded-full mt-1">
											{info.icon}
										</div>
										<div>
											<h3 className="font-medium">{info.title}</h3>
											{info.link ? (
												<a
													href={info.link}
													className="text-muted-foreground hover:text-primary transition-colors"
													target={
														info.title === "Location" ? "_blank" : undefined
													}
													rel={
														info.title === "Location"
															? "noopener noreferrer"
															: undefined
													}
												>
													{info.value}
												</a>
											) : (
												<p className="text-muted-foreground">{info.value}</p>
											)}
										</div>
									</CardContent>
								</Card>
							))}

							<Card>
								<CardContent className="p-6">
									<h3 className="font-medium mb-2">Connect with me</h3>
									<p className="text-sm text-muted-foreground mb-4">
										Find me on these platforms
									</p>
									<div className="flex gap-4">
										<Button variant="outline" size="icon" asChild>
											<a
												href="https://github.com/Samanimkr"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-5 w-5"
												>
													<title>GitHub</title>
													<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
													<path d="M9 18c-4.51 2-5-2-7-2"></path>
												</svg>
												<span className="sr-only">GitHub</span>
											</a>
										</Button>
										<Button variant="outline" size="icon" asChild>
											<a
												href="https://www.linkedin.com/in/samani-mukhtar/"
												target="_blank"
												rel="noopener noreferrer"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-5 w-5"
												>
													<title>LinkedIn</title>
													<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
													<rect width="4" height="12" x="2" y="9"></rect>
													<circle cx="4" cy="4" r="2"></circle>
												</svg>
												<span className="sr-only">LinkedIn</span>
											</a>
										</Button>
										<Button variant="outline" size="icon" asChild>
											<a href="mailto:samanimkr@outlook.com">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="h-5 w-5"
												>
													<title>Email</title>
													<rect
														width="20"
														height="16"
														x="2"
														y="4"
														rx="2"
													></rect>
													<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
												</svg>
												<span className="sr-only">Email</span>
											</a>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
