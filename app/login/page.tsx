"use client";

import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { Laptop, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MicroBadge } from "@/components/ui/design-system";

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
		<div className="flex min-h-screen items-center justify-center bg-background p-6 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="fixed top-6 right-6 z-50">
				<ThemeToggle />
			</div>

			<Link
				href="/"
				className="fixed top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
			>
				<ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
				Back to home
			</Link>

			<div className="relative z-10 w-full max-w-[440px] bg-card/30 backdrop-blur-xl border border-border/40 shadow-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col">
				<div className="flex flex-col items-center text-center mb-10">
					<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
						<Laptop size={24} />
					</div>
					<MicroBadge className="mb-4">Secure Authentication</MicroBadge>
					<h1 className="text-3xl font-black mozilla-headline tracking-tight mb-2">Welcome Back</h1>
					<p className="text-sm text-muted-foreground local-inter">
						Sign in to your account to manage invoices and clients.
					</p>
				</div>

				<div className="grid gap-4 w-full">
					<Button
						variant="outline"
						className="w-full h-12 rounded-xl border-border/60 bg-background/50 hover:bg-muted hover:text-foreground transition-all duration-200 local-jetbrains-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center"
						onClick={() => handleSignIn("github")}
					>
						<FaGithub className="mr-3 h-5 w-5" />
						Continue with GitHub
					</Button>
					<Button
						variant="outline"
						className="w-full h-12 rounded-xl border-border/60 bg-background/50 hover:bg-muted hover:text-foreground transition-all duration-200 local-jetbrains-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center"
						onClick={() => handleSignIn("google")}
					>
						<FaGoogle className="mr-3 h-5 w-5 text-[#4285F4]" />
						Continue with Google
					</Button>
				</div>

				<div className="mt-10 pt-8 border-t border-border/40 text-center w-full">
					<p className="text-xs text-muted-foreground google-sans uppercase tracking-widest">
						Protected by Better Auth & Supabase
					</p>
				</div>
			</div>
		</div>
	);
}
