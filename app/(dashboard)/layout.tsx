import { Navigation } from "@/components/navigation";
import { SidebarProvider } from "@/components/sidebar-context";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <FloatingNavbar className="hidden lg:flex" />
      <Navigation />
      <main className="transition-[padding] duration-300 lg:pl-[var(--sidebar-width,256px)] min-h-screen flex flex-col">
        <div className="flex-1 p-4 md:p-6 lg:p-10">{children}</div>
        <Footer />
      </main>
      <MobileBottomNav />
      <ScrollToTop />
    </SidebarProvider>
  );
}
