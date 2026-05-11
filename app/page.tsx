import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldCheck, Zap, Laptop, LayoutDashboard } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="min-h-screen bg-background flex flex-col">
			{/* Simple Header */}
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-background/60 backdrop-blur-xl border-b border-border/40">
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
						<Laptop size={18} />
					</div>
					<span className="text-xl font-black mozilla-headline tracking-tighter">InvoiceGen</span>
				</div>
				<div className="flex items-center gap-4">
					<ThemeToggle />
					<Link
						href="/login"
						className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-foreground text-background text-sm font-bold hover:scale-105 transition-transform"
					>
						Sign In
					</Link>
				</div>
			</header>

			<main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
				{/* Background Glows */}
				<div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-4xl w-full text-center relative z-10">
					<MicroBadge className="mb-6">Production Grade Invoice System</MicroBadge>
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-black mozilla-headline tracking-tighter leading-[0.85] mb-8">
						ELEGANT <span className="text-primary">INVOICING</span> <br /> FOR TECHS.
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground local-inter max-w-2xl mx-auto mb-12">
						A modern, high-performance invoice generator built for PC repair technicians.
						Manage clients, track repairs, and generate premium PDFs in seconds.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
						<Link
							href="/login"
							className="w-full sm:w-auto h-16 px-12 rounded-[2rem] bg-foreground text-background inline-flex items-center justify-center text-sm font-black hover:scale-105 transition-transform shadow-lg"
						>
							Get Started <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
						<Link
							href="https://github.com/prasad-kmd/invoice-gen"
							target="_blank"
							className="w-full sm:w-auto h-16 px-12 rounded-[2rem] border border-border bg-card/40 inline-flex items-center justify-center text-sm font-bold backdrop-blur-xl hover:bg-muted transition-colors"
						>
							<FaGithub className="mr-2 h-5 w-5" /> GitHub
						</Link>
					</div>

					{/* Feature Bento-lite */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
						<GlassCard className="p-8">
							<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
								<ShieldCheck size={24} />
							</div>
							<h3 className="text-xl font-bold mozilla-headline mb-2">Secure & Private</h3>
							<p className="text-sm text-muted-foreground local-inter">
								Your data is stored securely using Supabase and Better Auth protection.
							</p>
						</GlassCard>
						<GlassCard className="p-8">
							<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
								<Zap size={24} />
							</div>
							<h3 className="text-xl font-bold mozilla-headline mb-2">Blazing Fast</h3>
							<p className="text-sm text-muted-foreground local-inter">
								Built on Next.js 16 for instant navigation and rapid PDF generation.
							</p>
						</GlassCard>
						<GlassCard className="p-8">
							<div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
								<LayoutDashboard size={24} />
							</div>
							<h3 className="text-xl font-bold mozilla-headline mb-2">Modern UX</h3>
							<p className="text-sm text-muted-foreground local-inter">
								A beautiful, glassy dashboard that works perfectly on desktop and mobile.
							</p>
						</GlassCard>
					</div>
				</div>
			</main>

			<footer className="py-12 border-t border-border/40 bg-card/30 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-2">
						<div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-primary text-xs">
							IG
						</div>
						<span className="text-sm font-bold mozilla-headline tracking-tight uppercase">InvoiceGen</span>
					</div>
					<p className="text-xs text-muted-foreground google-sans uppercase tracking-widest">
						© 2026 PRASAD M. · BUILT WITH NEXT.JS 16 & TAILWIND 4
					</p>
					<div className="flex items-center gap-4">
						<Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Privacy</Link>
						<Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Terms</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
