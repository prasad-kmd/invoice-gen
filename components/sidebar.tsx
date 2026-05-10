"use client";

import Link from "next/link";
import { LayoutDashboard, Users, ReceiptText, Settings, LogOut, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Invoices", href: "/invoices", icon: ReceiptText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        }
      }
    });
  };

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full bg-card/30 backdrop-blur-xl">
      <div className={cn(
        "flex h-20 items-center border-b px-6 transition-all duration-300",
        isCollapsed && !mobile ? "justify-center px-2" : "justify-between"
      )}>
        {(!isCollapsed || mobile) && (
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            PC REPAIR
          </span>
        )}
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex h-8 w-8 rounded-full border bg-background shadow-sm hover:bg-accent"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 py-6">
        <nav className="space-y-2 px-3">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                title={isCollapsed && !mobile ? item.name : ""}
                className={cn(
                  "group flex items-center rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  isCollapsed && !mobile && "justify-center px-2"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                  (!isCollapsed || mobile) && "mr-3"
                )} />
                {(!isCollapsed || mobile) && <span>{item.name}</span>}
                {isActive && !isCollapsed && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4">
        <div className={cn(
            "rounded-2xl border bg-muted/20 p-2 transition-all duration-300",
            isCollapsed && !mobile ? "opacity-0 invisible h-0" : "opacity-100"
        )}>
            <div className="flex items-center gap-3 p-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Pro Account</span>
                    <span className="text-[10px] text-muted-foreground">Admin Access</span>
                </div>
            </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full mt-4 justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all duration-300",
            isCollapsed && !mobile && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", (!isCollapsed || mobile) && "mr-3")} />
          {(!isCollapsed || mobile) && <span className="font-semibold">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex h-screen flex-col border-r bg-card sticky top-0 transition-all duration-300 z-40 shadow-2xl shadow-black/5",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <NavContent />
      </aside>

      {/* Mobile Sidebar Trigger & Sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-[60] bg-background/80 backdrop-blur border shadow-sm rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80 border-r-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <NavContent mobile />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
