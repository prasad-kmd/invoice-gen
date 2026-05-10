"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, LogOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

const sidebarItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className, onItemClick }: { className?: string, onItemClick?: () => void }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                }
            }
        });
    };

	return (
		<div className={cn("flex h-full flex-col bg-background", className)}>
			<div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
				    <FileText className="h-6 w-6 text-primary" />
				    <span className="text-xl font-bold font-google-sans">Invoice Pro</span>
                </Link>
			</div>
			<div className="flex-1 overflow-y-auto py-6">
				<nav className="space-y-2 px-4">
					{sidebarItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onItemClick}
                                className={cn(
                                    "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground")} />
                                {item.name}
                            </Link>
                        );
                    })}
				</nav>
			</div>
			<div className="mt-auto border-t p-4">
				<button 
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors duration-200"
                >
					<LogOut className="mr-3 h-5 w-5" />
					Logout
				</button>
			</div>
		</div>
	);
}
