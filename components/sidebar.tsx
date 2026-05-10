"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

const sidebarItems = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Clients", href: "/clients", icon: Users },
	{ name: "Invoices", href: "/invoices", icon: ReceiptText },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
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
		<div className="flex h-full w-64 flex-col border-r bg-background">
			<div className="flex h-16 items-center border-b px-6">
				<span className="text-lg font-bold">PC Repair Invoice</span>
			</div>
			<div className="flex-1 overflow-y-auto py-4">
				<nav className="space-y-1 px-3">
					{sidebarItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
							)}
						>
							<item.icon className="mr-3 h-5 w-5" />
							{item.name}
						</Link>
					))}
				</nav>
			</div>
			<div className="border-t p-4">
				<button 
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
					<LogOut className="mr-3 h-5 w-5" />
					Logout
				</button>
			</div>
		</div>
	);
}
