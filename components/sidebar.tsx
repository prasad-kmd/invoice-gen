"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
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
			<div className="flex h-16 items-center justify-between px-6 border-b border-border/40">
				{!collapsed && (
					<span className="text-lg font-bold mozilla-headline tracking-tight">InvoiceGen</span>
				)}
				<button
					onClick={() => setCollapsed(!collapsed)}
					className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors ml-auto"
				>
					{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				</button>
			</div>

			<div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
				{sidebarItems.map((item) => {
					const isActive = pathname.startsWith(item.href);
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 local-jetbrains-mono",
								isActive
									? "bg-primary/10 text-primary shadow-sm"
									: "text-muted-foreground hover:bg-muted hover:text-foreground hover:-translate-y-0.5"
							)}
						>
							<item.icon className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
							{!collapsed && <span>{item.name}</span>}
							{collapsed && (
								<div className="fixed left-20 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-border shadow-md whitespace-nowrap z-50">
									{item.name}
								</div>
							)}
						</Link>
					);
				})}
			</div>

			<div className="p-4 border-t border-border/40">
				<button
					onClick={handleLogout}
					className={cn(
						"flex items-center w-full rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 local-jetbrains-mono",
						collapsed ? "justify-center" : ""
					)}
				>
					<LogOut className={cn("h-5 w-5 shrink-0", !collapsed && "mr-3")} />
					{!collapsed && <span>Logout</span>}
				</button>
			</div>
		</aside>
	);
}
