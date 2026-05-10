import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle2, FileText, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function HomePage() {
    const sessionResponse = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    });

    if (sessionResponse?.data) {
        redirect("/dashboard");
    }

	return (
		<div className="flex flex-col min-h-screen">
			<header className="px-4 lg:px-6 h-16 flex items-center border-b">
				<Link className="flex items-center justify-center" href="#">
					<FileText className="h-6 w-6 text-primary" />
					<span className="ml-2 text-xl font-bold font-google-sans">Invoice Pro</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
					<ThemeToggle />
					<Button asChild variant="ghost">
						<Link href="/login">Log in</Link>
					</Button>
					<Button asChild>
						<Link href="/login">Get Started</Link>
					</Button>
				</nav>
			</header>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
					<div className="container px-4 md:px-6 text-center">
						<div className="space-y-4">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-google-sans max-w-3xl mx-auto">
								Professional Invoicing <span className="text-primary">Made Simple</span>
							</h1>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								The all-in-one solution for small businesses and freelancers to manage clients,
								create professional PDF invoices, and track payments effortlessly.
							</p>
							<div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
								<Button size="lg" asChild className="px-8">
									<Link href="/login">Log in</Link>
								</Button>
								<Button size="lg" variant="outline" asChild className="px-8">
									<Link href="https://github.com/prasad-kmd/invoice-gen" target="_blank">
										<FaGithub className="mr-2 h-4 w-4" />
										View GitHub Repo
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>

				<section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex justify-center border-y">
					<div className="container px-4 md:px-6">
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<FileText className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Professional PDFs</h3>
								<p className="text-muted-foreground">
									Generate beautiful, professional PDF invoices that reflect your brand identity perfectly.
								</p>
							</div>
							<div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<Users className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Client Management</h3>
								<p className="text-muted-foreground">
									Keep all your client information organized in one place with our intuitive client CRM.
								</p>
							</div>
							<div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<LayoutDashboard className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Insightful Dashboard</h3>
								<p className="text-muted-foreground">
									Get a bird's eye view of your business performance with real-time stats and tracking.
								</p>
							</div>
							<div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<ShieldCheck className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Secure & Private</h3>
								<p className="text-muted-foreground">
									Your data is protected with enterprise-grade security and authentication.
								</p>
							</div>
							<div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<CheckCircle2 className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Multiple Currencies</h3>
								<p className="text-muted-foreground">
									Support for LKR, USD, EUR, and more. Generate invoices in the currency your clients expect.
								</p>
							</div>
                            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background border shadow-sm">
								<div className="p-3 rounded-full bg-primary/10">
									<FaGithub className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold font-google-sans">Open Source</h3>
								<p className="text-muted-foreground">
									Transparent, extensible, and free to host yourself. Built with modern Next.js 15.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground">
					© {new Date().getFullYear()} Invoice Pro. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="https://github.com/prasad-kmd/invoice-gen">
						GitHub Repository
					</Link>
				</nav>
			</footer>
		</div>
	);
}
