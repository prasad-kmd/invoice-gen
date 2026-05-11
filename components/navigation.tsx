"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useSidebar } from "./sidebar-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Invoices", href: "/invoices", icon: ReceiptText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const renderNavItem = (item: {
    name: string;
    href: string;
    icon: React.ElementType;
  }) => {
    const isActive =
      pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Tooltip key={item.name} delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all gap-3 relative group local-jetbrains-mono",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              isCollapsed
                ? "lg:justify-center lg:px-2 lg:gap-0"
                : "justify-start",
            )}
          >
            <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
            <span
              className={cn(
                "transition-all duration-300",
                isCollapsed
                  ? "lg:opacity-0 lg:w-0 lg:overflow-hidden"
                  : "opacity-100",
              )}
            >
              {item.name}
            </span>
            {isActive && !isCollapsed && (
                <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="ml-2 font-bold local-jetbrains-mono uppercase text-[10px] tracking-widest">
            {item.name}
          </TooltipContent>
        )}
      </Tooltip>
    );
  };

  return (
    <>
      {/* Top Banner Mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-background/60 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 bg-primary rounded flex items-center justify-center">
                <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold mozilla-headline tracking-tight">
                {siteConfig.author}
            </span>
        </Link>
        <div className="h-8 w-8 rounded-full bg-muted/50 border border-border/50 overflow-hidden">
            {/* User Avatar Placeholder */}
            <div className="h-full w-full flex items-center justify-center text-[10px] font-bold">
                AD
            </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-card/70 backdrop-blur-xl transition-all duration-300 ease-in-out lg:block",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-full flex-col relative">
          {/* Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground shadow-sm transition-transform hover:scale-110 group"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          {/* Logo */}
          <div
            className={cn(
              "px-6 py-8 transition-all duration-300",
              isCollapsed ? "px-4" : "px-6",
            )}
          >
            <Link
              href="/"
              className="block"
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  isCollapsed && "justify-center gap-0",
                )}
              >
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Terminal className="h-6 w-6 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <h1 className="text-xl font-bold leading-tight mozilla-headline tracking-tight">
                      {siteConfig.author}
                    </h1>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-primary/80 font-bold local-jetbrains-mono">
                      {siteConfig.name}
                    </p>
                  </motion.div>
                )}
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigationItems.map(renderNavItem)}
          </nav>

          {/* Logout */}
          <div
            className={cn(
              "border-t border-border px-3 py-4",
              isCollapsed && "px-2",
            )}
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all gap-3 text-destructive hover:bg-destructive/10 local-jetbrains-mono",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>Logout</span>}
                </button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="ml-2 font-bold local-jetbrains-mono uppercase text-[10px] tracking-widest bg-destructive text-destructive-foreground">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Mobile Top Spacer */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
