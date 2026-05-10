"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { FileText, CheckCircle2, ShieldCheck, Zap, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState<string | null>(null);

	const handleSignIn = async (provider: "github" | "google") => {
        setLoading(provider);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/dashboard",
			});
		} catch (error) {
			toast.error("Failed to sign in");
		} finally {
            setLoading(null);
        }
	};

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
            {/* Left Column: Branding & Features */}
            <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-between p-12 text-primary-foreground">
                <Link href="/" className="flex items-center gap-2">
                    <FileText className="h-8 w-8" />
                    <span className="text-2xl font-bold font-google-sans">Invoice Pro</span>
                </Link>

                <div className="space-y-8">
                    <h2 className="text-4xl font-bold font-google-sans leading-tight">
                        The modern way to manage your business invoicing.
                    </h2>
                    <ul className="space-y-4 text-lg opacity-90">
                        <li className="flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6" />
                            Secure, private data management
                        </li>
                        <li className="flex items-center gap-3">
                            <Zap className="h-6 w-6" />
                            Fast, professional PDF generation
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6" />
                            Multi-currency support for global clients
                        </li>
                    </ul>
                </div>

                <div className="text-sm opacity-70">
                    © {new Date().getFullYear()} Invoice Pro. Build with Next.js & Tailwind CSS.
                </div>
            </div>

            {/* Right Column: Login Card */}
			<div className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/30">
                <div className="absolute top-6 right-6 flex items-center gap-2">
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="flex md:hidden items-center justify-center gap-2 mb-8">
                        <FileText className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold font-google-sans">Invoice Pro</span>
                    </div>

                    <Card className="border-none shadow-xl bg-background/60 backdrop-blur-sm">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-3xl font-bold font-google-sans">Welcome back</CardTitle>
                            <CardDescription className="text-base">
                                Choose your preferred sign-in method
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                                onClick={() => handleSignIn("github")}
                                disabled={!!loading}
                            >
                                {loading === "github" ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <FaGithub className="mr-2 h-5 w-5" />
                                )}
                                Continue with GitHub
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                                onClick={() => handleSignIn("google")}
                                disabled={!!loading}
                            >
                                {loading === "google" ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <FaGoogle className="mr-2 h-5 w-5" />
                                )}
                                Continue with Google
                            </Button>
                        </CardContent>
                    </Card>

                    <p className="text-center text-sm text-muted-foreground">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
			</div>
		</div>
	);
}
