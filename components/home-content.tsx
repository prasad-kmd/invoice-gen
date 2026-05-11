"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Github,
    ShieldCheck,
    LayoutDashboard,
    Zap,
    Users,
    FileText,
    Settings as SettingsIcon,
    Terminal,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/config";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HomePageContent({ session }: { session: any }) {
  const isLoggedIn = !!session;
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".feature-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".feature-grid",
          start: "top 80%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center lg:pt-32">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl hero-content">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary local-jetbrains-mono">
              Professional Invoice Generator
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[0.9] tracking-tight mozilla-headline sm:text-7xl lg:text-8xl text-balance">
            Streamline Your <span className="text-primary">Repair</span> Business.
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground google-sans tracking-tight sm:text-xl">
            {siteConfig.description}. Manage clients, track billing, and generate professional PDFs in seconds. Built for speed and precision.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {isLoggedIn ? (
              <Button
                asChild
                className="h-16 rounded-[2rem] bg-foreground px-12 text-sm font-black transition-transform hover:scale-105 active:scale-95"
              >
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="h-16 rounded-[2rem] bg-primary px-12 text-sm font-black text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              >
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              className="h-16 rounded-[2rem] border-border/40 bg-card/40 px-12 text-sm font-bold backdrop-blur-xl transition-all hover:bg-muted"
            >
              <Link href="https://github.com/prasad-kmd/next-notion-cms" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                GitHub Repo
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Preview / Mockup */}
        <div className="relative mt-20 w-full max-w-6xl px-4 lg:mt-32">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="group relative rounded-[2rem] border border-border/40 bg-card/60 p-4 backdrop-blur-3xl shadow-2xl transition-all duration-700 hover:border-primary/40"
            >
                <div className="absolute -inset-1 rounded-[2.1rem] bg-gradient-to-tr from-primary/20 to-transparent blur opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-[1.5rem] bg-background/50 aspect-video lg:aspect-[21/9] border border-border/20">
                    <div className="flex h-full items-center justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 w-full max-w-4xl">
                            {[
                                { icon: Zap, label: "Fast Generation", desc: "PDFs in < 1s" },
                                { icon: Users, label: "Client Tracking", desc: "Complete History" },
                                { icon: FileText, label: "Custom Invoices", desc: "Dynamic Items" },
                                { icon: ShieldCheck, label: "Secure Data", desc: "Role-based Access" },
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 text-center">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-bold mozilla-headline text-sm tracking-tight">{feature.label}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold local-jetbrains-mono">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-24 lg:py-32 bg-card/30 feature-grid">
        <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-left max-w-2xl">
                <h2 className="text-4xl font-black mozilla-headline tracking-tighter mb-4">Powerful Features for <br/>Modern Technicians.</h2>
                <p className="text-muted-foreground google-sans leading-relaxed">Everything you need to manage your repair billing in one clean, editorial interface. No bloat, just efficiency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Client Management",
                        description: "Store client contact details and view their full invoice history at a glance. Reuse client profiles to generate invoices faster.",
                        icon: Users,
                    },
                    {
                        title: "Dynamic Line Items",
                        description: "Add services, parts, and labor with customizable quantities and prices. Automatic calculations for taxes and discounts.",
                        icon: FileText,
                    },
                    {
                        title: "System Settings",
                        description: "Configure your business profile, set default tax rates, and customize invoice prefixes to match your branding.",
                        icon: SettingsIcon,
                    }
                ].map((feature, i) => (
                    <div key={i} className="feature-card group p-8 rounded-[2rem] border border-border/40 bg-background/50 backdrop-blur-xl transition-all hover:border-primary/50 hover:-translate-y-1 shadow-lg hover:shadow-primary/5">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold mozilla-headline tracking-tight mb-3">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground google-sans leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
