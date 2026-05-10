"use client";

import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const getPageTitle = () => {
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length === 0) return "Dashboard";
        const lastPart = parts[parts.length - 1];
        return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    };

	return (
		<div className="flex h-screen bg-muted/30 overflow-hidden">
			{/* Desktop Sidebar */}
			<aside className="hidden lg:block w-64 border-r bg-background shrink-0">
				<Sidebar />
			</aside>

			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* Top Header */}
				<header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
					<div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
                            </SheetContent>
                        </Sheet>
						<h1 className="text-xl font-bold font-google-sans hidden sm:block">
                            {getPageTitle()}
                        </h1>
					</div>

					<div className="flex items-center gap-2 sm:gap-4">
						<ThemeToggle />
                        <div className="h-8 w-px bg-border mx-1" />
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <UserCircle className="h-6 w-6 text-muted-foreground" />
                        </Button>
					</div>
				</header>

				{/* Main Content Area */}
				<main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
					    {children}
                    </div>
				</main>
			</div>
		</div>
	);
}
