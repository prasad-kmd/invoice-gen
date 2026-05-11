import { Navigation } from "@/components/navigation";
import { SidebarProvider } from "@/components/sidebar-context";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Footer } from "@/components/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<FloatingNavbar className="hidden lg:flex" />
			<Navigation />
			<main className="transition-[padding] duration-300 lg:pl-[var(--sidebar-width,256px)] min-h-screen flex flex-col">
				<div className="flex-1 p-4 md:p-8">
					{children}
				</div>
				<Footer />
			</main>
		</SidebarProvider>
	);
}
