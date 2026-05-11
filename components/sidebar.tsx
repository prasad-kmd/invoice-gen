"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				},
			},
		});
	};

	return (
		<aside
			data-collapsed={collapsed}
			className={cn(
				"fixed inset-y-0 left-0 z-40 bg-card/70 backdrop-blur-xl border-r border-border transition-all duration-300 ease-in-out hidden lg:flex flex-col",
				collapsed ? "w-20" : "w-64"
			)}
		>
			<div className="flex h-20 items-center justify-between px-6 border-b border-border/40">
				{!collapsed && (
					<div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary transition-colors">
                            <span className="font-black text-xs">IG</span>
                        </div>
					    <span className="text-xl font-black mozilla-headline tracking-tighter">InvoiceGen</span>
                    </div>
				)}
				<button
					onClick={() => setCollapsed(!collapsed)}
					className={cn(
                        "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors hover:text-foreground shadow-inner",
                        collapsed ? "mx-auto" : "ml-auto"
                    )}
				>
					{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				</button>
			</div>

			<div className="flex-1 overflow-y-auto py-8 px-3 space-y-2">
				{sidebarItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"group relative flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 local-jetbrains-mono",
								isActive
									? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,128,128,0.1)] border border-primary/10"
									: "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:-translate-y-0.5"
							)}
						>
							<item.icon className={cn("h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110", !collapsed && "mr-4")} />
							{!collapsed && <span className="uppercase tracking-widest text-[11px] font-bold">{item.name}</span>}
							{collapsed && (
								<div className="fixed left-20 ml-4 px-3 py-2 bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 border border-border shadow-xl z-50">
									{item.name}
								</div>
							)}
                            {isActive && (
                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            )}
						</Link>
					);
				})}
			</div>

			<div className="p-6 border-t border-border/40">
				<button
					onClick={handleLogout}
					className={cn(
						"flex items-center w-full rounded-xl px-3 py-3 text-[11px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-all duration-300 local-jetbrains-mono group",
						collapsed ? "justify-center" : ""
					)}
				>
					<LogOut className={cn("h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1", !collapsed && "mr-4")} />
					{!collapsed && <span>Logout</span>}
				</button>
			</div>
		</aside>
	);
}
