import { Navigation } from "@/components/navigation";
import { SidebarProvider } from "@/components/sidebar-context";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ScrollToTop } from "@/components/scroll-to-top";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SidebarProvider>
      <FloatingNavbar className="hidden lg:flex" session={session} />
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
