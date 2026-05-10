"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
	const handleSignIn = async (provider: "github" | "google") => {
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/dashboard",
			});
		} catch (error) {
			toast.error("Failed to sign in");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>Enter your credentials to access the invoice generator</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Button variant="outline" className="w-full" onClick={() => handleSignIn("github")}>
						<FaGithub className="mr-2 h-4 w-4" />
						Continue with GitHub
					</Button>
					<Button variant="outline" className="w-full" onClick={() => handleSignIn("google")}>
						<FaGoogle className="mr-2 h-4 w-4" />
						Continue with Google
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
