"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, Menu, X, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
	const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			{/* Top Banner */}
			<div className="fixed top-0 left-0 right-0 h-16 z-50 flex lg:hidden items-center justify-between px-6 bg-background/60 backdrop-blur-xl border-b border-border/40">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="font-black text-[10px]">IG</span>
                    </div>
				    <span className="text-lg font-black mozilla-headline tracking-tighter">InvoiceGen</span>
                </div>
				<div className="flex items-center gap-3">
                    <ThemeToggle />
					<button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-xl bg-muted/50 text-foreground transition-all active:scale-95"
                    >
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-md pt-24 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <p className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">Navigation</p>
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                    isActive ? "bg-primary/10 text-primary border border-primary/10" : "bg-muted/30 text-foreground"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="font-bold local-jetbrains-mono uppercase tracking-widest text-xs">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            )}

			{/* Bottom Dock */}
			<nav className="fixed bottom-6 left-6 right-6 z-50 lg:hidden flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-full overflow-hidden">
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
								isActive ? "text-primary bg-primary/10 scale-110" : "text-muted-foreground hover:text-foreground active:scale-90"
							)}
						>
							<item.icon size={20} />
						</Link>
					);
				})}
                <div className="w-px h-6 bg-border mx-2" />
                <Link
                    href="/invoices/new"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 active:scale-90 transition-transform"
                >
                    <Plus size={20} />
                </Link>
			</nav>
		</>
	);
}
