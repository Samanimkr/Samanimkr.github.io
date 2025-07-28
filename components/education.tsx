import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Education() {
	return (
		<div className="w-full bg-muted/30">
			<section id="education" className="py-20">
				<div className="container px-4 md:px-6 mx-auto">
				<div className="space-y-12">
					<div className="space-y-4 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Education
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							My academic background and qualifications
						</p>
					</div>

					<div className="flex justify-center">
						<div className="max-w-2xl w-full">
							<Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
								<CardContent className="p-4 sm:p-6 md:p-8">
									<div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
										<div className="bg-primary/10 p-3 sm:p-4 rounded-full flex-shrink-0 mx-auto sm:mx-0">
											<GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
										</div>
										<div className="flex-1 text-center sm:text-left">
											<h3 className="text-lg sm:text-xl font-bold mb-2">
												Computer Science with Innovation
											</h3>
											<p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
												University of Bristol, UK (2019-2022)
											</p>
											<p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
												Completed a comprehensive computer science program with
												a focus on software development, algorithms, data
												structures, and system design. Gained a strong
												foundation in computer science principles and
												engineering practices that have been instrumental in my
												professional career.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
		</div>
	);
}
