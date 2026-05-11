"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Shield,
  Terminal,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-md overflow-hidden mt-auto">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and Brand Identity */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary shadow-sm overflow-hidden p-1.5">
                <Terminal className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold mozilla-headline tracking-tight">
                  PC Repair
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold google-sans">
                    Invoice Gen
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground google-sans leading-relaxed max-w-sm mb-6">
                Professional invoice generator for PC repair technicians. Manage clients, track invoices, and generate PDFs with ease.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-bold mb-6 mozilla-headline uppercase tracking-widest flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" /> App
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
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Technical */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold mb-6 mozilla-headline uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Info
            </h3>
            <p className="text-sm text-muted-foreground google-sans leading-relaxed">
                This is a private instance of the PC Repair Invoice Generator. All data is securely stored and managed according to administrative policies.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-muted-foreground google-sans">
              © {currentYear} PC Repair Invoice Gen. All rights reserved.
            </p>
            <p className="text-[10px] text-muted-foreground/60 font-mono tracking-tight uppercase">
              Built with Next.js 16 & Tailwind CSS 4
            </p>
          </div>

          <div
            className="flex items-center gap-4 px-4 py-2 rounded-full bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
          >
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-medium google-sans uppercase tracking-tighter text-muted-foreground">
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
