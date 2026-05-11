"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  Settings,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Add", href: "/invoices/new", icon: Plus, isAction: true },
  { name: "Invoices", href: "/invoices", icon: ReceiptText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Don't show on login page
  if (pathname === "/login") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4">
      <nav className="flex items-center justify-around h-16 bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          if (item.isAction) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-center -mt-8"
              >
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 flex items-center justify-center border-4 border-background transition-transform active:scale-90">
                  <item.icon className="h-6 w-6" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors relative flex-1 h-full",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-tighter google-sans">
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
