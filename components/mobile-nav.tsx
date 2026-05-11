"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
	const pathname = usePathname();

	return (
		<>
			{/* Top Banner */}
			<div className="fixed top-0 left-0 right-0 h-14 z-50 flex lg:hidden items-center justify-between px-4 bg-background/60 backdrop-blur-xl border-b border-border/40">
				<span className="text-lg font-bold mozilla-headline tracking-tight">InvoiceGen</span>
				<div className="flex items-center gap-2">
					<button className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
						<Menu size={20} />
					</button>
				</div>
			</div>

			{/* Bottom Dock */}
			<nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex items-center justify-around px-2 py-2 bg-background/80 backdrop-blur-xl border-t border-border shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)] rounded-t-[2rem]">
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200",
								isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
							)}
						>
							<item.icon size={22} />
						</Link>
					);
				})}
			</nav>
		</>
	);
}
