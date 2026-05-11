import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldCheck, Zap, Laptop, ArrowUpRight, Terminal, Box, Database, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard, MicroBadge, TechTag } from "@/components/ui/design-system";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/dashboard");
	}

	return (
		<div className="min-h-screen bg-background flex flex-col selection:bg-primary/20 selection:text-primary">
			{/* Floating Header */}
			<header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-5xl h-14 px-6 rounded-full bg-background/60 backdrop-blur-xl border border-border/60 shadow-2xl flex items-center justify-between">
				<div className="flex items-center gap-2 group cursor-pointer">
					<div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
						<Laptop size={14} />
					</div>
					<span className="text-lg font-black mozilla-headline tracking-tighter">InvoiceGen</span>
				</div>
				<div className="flex items-center gap-2 md:gap-4">
                    <nav className="hidden md:flex items-center gap-6 mr-4">
                        <Link href="#features" className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</Link>
                        <Link href="#tech" className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Architecture</Link>
                    </nav>
					<ThemeToggle />
					<Link
						href="/login"
						className="flex items-center gap-2 h-9 px-5 rounded-full bg-foreground text-background text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-foreground/10"
					>
						Enter Terminal
					</Link>
				</div>
			</header>

			<main className="flex-1 flex flex-col items-center pt-48 pb-20 px-6 relative overflow-hidden">
				{/* Background Atmosphere */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-linear-to-b from-primary/10 to-transparent blur-[120px] pointer-events-none opacity-50" />
                <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

				<div className="max-w-5xl w-full text-center relative z-10">
					<div className="flex justify-center mb-8">
                        <TechTag className="px-4 py-1.5 border-primary/20 bg-primary/10 text-primary">v1.0.0-PROD</TechTag>
                    </div>
					<h1 className="text-6xl md:text-8xl lg:text-9xl font-black mozilla-headline tracking-tighter leading-[0.8] mb-10 uppercase">
						Engineering <br />
						<span className="text-primary inline-flex items-center">
                            Excellence
                            <div className="ml-4 h-2 w-2 rounded-full bg-primary animate-ping hidden md:block" />
                        </span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground local-inter max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
						Redefining repair billing with a high-performance, Notion-inspired ecosystem.
                        Precision-engineered for the modern technician.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-32">
						<Link
							href="/login"
							className="group w-full sm:w-auto h-16 px-14 rounded-[2rem] bg-foreground text-background inline-flex items-center justify-center text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-foreground/20"
						>
							Launch Workspace <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</Link>
						<Link
							href="https://github.com/prasad-kmd/invoice-gen"
							target="_blank"
							className="w-full sm:w-auto h-16 px-14 rounded-[2rem] border border-border/60 bg-card/40 inline-flex items-center justify-center text-sm font-bold backdrop-blur-xl hover:bg-muted hover:border-primary/30 transition-all active:scale-95 shadow-xl"
						>
							<FaGithub className="mr-2 h-5 w-5" /> GitHub Repo
						</Link>
					</div>

                    {/* Featured Bento Grid */}
                    <div id="features" className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left mb-32">
                        <GlassCard className="md:col-span-2 md:row-span-2 p-10 flex flex-col justify-between min-h-[400px] group">
                            <div>
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:rotate-12 transition-transform duration-500">
                                    <Terminal size={28} />
                                </div>
                                <h3 className="text-3xl font-black mozilla-headline mb-4 uppercase tracking-tight">Technical Core</h3>
                                <p className="text-muted-foreground local-inter font-medium leading-relaxed">
                                    Built on Next.js 16 and Tailwind 4, our architecture prioritizes performance and type-safety above all else.
                                    A robust Drizzle ORM layer ensures your data is always consistent and accessible.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-8">
                                <TechTag>Next.js 16</TechTag>
                                <TechTag>Tailwind 4</TechTag>
                                <TechTag>Turbopack</TechTag>
                                <TechTag>Drizzle</TechTag>
                            </div>
                        </GlassCard>

                        <GlassCard className="md:col-span-2 p-8 group">
                            <div className="flex items-start justify-between">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Box size={22} />
                                </div>
                                <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mozilla-headline mb-2 uppercase">Glassy UX</h3>
                            <p className="text-sm text-muted-foreground local-inter font-medium">
                                Redesigned with a heavy focus on glass-morphism, backdrop blurs, and sophisticated typography hierarchy.
                            </p>
                        </GlassCard>

                        <GlassCard className="md:col-span-1 p-8 group">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:-translate-y-1 transition-transform">
                                <Database size={22} />
                            </div>
                            <h3 className="text-xl font-bold mozilla-headline mb-2 uppercase">CRM</h3>
                            <p className="text-sm text-muted-foreground local-inter font-medium">
                                Integrated client management with historical invoice tracking.
                            </p>
                        </GlassCard>

                        <GlassCard className="md:col-span-1 p-8 group">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:rotate-6 transition-transform">
                                <Lock size={22} />
                            </div>
                            <h3 className="text-xl font-bold mozilla-headline mb-2 uppercase">Auth</h3>
                            <p className="text-sm text-muted-foreground local-inter font-medium">
                                Better Auth integration for military-grade security.
                            </p>
                        </GlassCard>
                    </div>

                    {/* Stats / Tech Section */}
                    <div id="tech" className="py-20 border-y border-border/40 flex flex-wrap justify-around gap-12 text-center bg-card/10 backdrop-blur-sm rounded-[3rem] mb-32">
                        <div className="space-y-2">
                            <p className="text-4xl font-black mozilla-headline text-primary tracking-tighter">100%</p>
                            <p className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground">Type Safe</p>
                        </div>
                        <div className="w-px h-12 bg-border/40 hidden md:block" />
                        <div className="space-y-2">
                            <p className="text-4xl font-black mozilla-headline text-foreground tracking-tighter">4.0</p>
                            <p className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground">Tailwind V</p>
                        </div>
                        <div className="w-px h-12 bg-border/40 hidden md:block" />
                        <div className="space-y-2">
                            <p className="text-4xl font-black mozilla-headline text-foreground tracking-tighter">0ms</p>
                            <p className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground">Latent Load</p>
                        </div>
                        <div className="w-px h-12 bg-border/40 hidden md:block" />
                        <div className="space-y-2">
                            <p className="text-4xl font-black mozilla-headline text-primary tracking-tighter">LKR</p>
                            <p className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground">Base Currency</p>
                        </div>
                    </div>
				</div>
			</main>

			<footer className="py-20 border-t border-border/40 bg-card/30 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
				<div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-10">
					<div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                <span className="font-black">IG</span>
                            </div>
                            <span className="text-2xl font-black mozilla-headline tracking-tighter uppercase">InvoiceGen</span>
                        </div>
						<p className="text-[10px] font-bold text-primary/80 google-sans uppercase tracking-[0.3em]">Engineering Workspace Platform</p>
					</div>
					<div className="flex flex-col items-center gap-6">
                        <p className="text-xs text-muted-foreground google-sans uppercase tracking-[0.2em] font-medium">
						    © 2026 PRASAD M. · BUILT WITH NEXT.JS 16 & TAILWIND 4
					    </p>
                        <div className="flex items-center gap-8">
                            <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">Privacy</Link>
                            <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">Terms</Link>
                            <Link href="#" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]">Changelog</Link>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="h-12 w-12 rounded-2xl border border-border/60 flex items-center justify-center hover:border-primary transition-colors bg-background/50">
                            <FaGithub size={20} />
                        </button>
                    </div>
				</div>
			</footer>
		</div>
	);
}
