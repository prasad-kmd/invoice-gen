"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Shield,
  Terminal,
  Github,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-md overflow-hidden mt-auto">
      {/* Animated blobs for atmosphere */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand block */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary shadow-sm overflow-hidden p-1.5">
                <Terminal className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold mozilla-headline tracking-tight">
                  {siteConfig.author}
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold google-sans">
                  {siteConfig.name}
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground google-sans leading-relaxed max-w-sm mb-8">
              {siteConfig.description}. Streamlined client management and professional PDF generation for modern technicians.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: `mailto:support@example.com`, label: "Email" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-6 mozilla-headline uppercase tracking-widest flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Clients", href: "/clients" },
                { name: "Invoices", href: "/invoices" },
                { name: "Settings", href: "/settings" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-colors google-sans"
                  >
                    {link.name}
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold mb-6 mozilla-headline uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Admin System
            </h3>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
                <p className="text-sm text-muted-foreground google-sans leading-relaxed mb-4">
                    This is a private instance. Access is restricted to authorized administrative personnel.
                    Unauthorized access attempts are logged.
                </p>
                <Link
                    href="/login"
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                >
                    Administrative Login <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-muted-foreground google-sans">
              © {currentYear} {siteConfig.author} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 font-mono tracking-tight uppercase">
              Engineered with Next.js 15 & Tailwind CSS 4
            </p>
          </div>

          <div
            className="flex items-center gap-4 px-4 py-2 rounded-full bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold google-sans uppercase tracking-widest text-muted-foreground">
              Core Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
