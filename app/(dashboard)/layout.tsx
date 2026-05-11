import { Sidebar } from "@/components/sidebar";
import { FloatingNavbar } from "@/components/floating-navbar";
import { MobileNav } from "@/components/mobile-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen bg-background relative group/shell">
			<Sidebar />
			<div className="flex-1 flex flex-col min-w-0 lg:pl-64 group-has-[[data-collapsed=true]]/shell:lg:pl-20 transition-[padding] duration-300">
				<FloatingNavbar />
				<MobileNav />
				<main className="flex-1 px-4 pt-20 pb-28 lg:px-8 lg:pt-24 lg:pb-10 max-w-7xl mx-auto w-full">
					{children}
				</main>
			</div>
		</div>
	);
}
