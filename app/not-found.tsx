"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the homepage
		router.push("/");
	}, [router]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
				<p className="mb-8">Redirecting to homepage...</p>
			</div>
		</div>
	);
}
