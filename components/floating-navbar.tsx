"use client";

import { usePathname } from "next/navigation";
import {
  LogOut,
  Palette,
  FilePlus,
  UserPlus,
  Sun,
  Moon,
  ChevronDown,
  User
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAccentColor } from "@/hooks/use-accent-color";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function FloatingNavbar({
  className,
  session,
}: {
  className?: string;
  session?: any;
}) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { accentColor, updateAccentColor, ACCENT_COLORS } = useAccentColor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const user = session?.user;

  return (
    <div
      className={cn(
        "fixed z-50 flex items-center gap-2 p-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-border/40 shadow-2xl transition-all duration-300",
        scrolled ? "top-4 right-4" : "top-6 right-6",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 px-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => router.push("/invoices/new")}
              className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90"
            >
              <FilePlus className="h-4.5 w-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-widest">New Invoice</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => router.push("/clients/new")}
              className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90"
            >
              <UserPlus className="h-4.5 w-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-widest">New Client</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-px h-5 bg-border/40 mx-0.5" />

      <div className="flex items-center gap-1.5 px-1">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                >
                    <Palette className="h-4.5 w-4.5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-3 rounded-2xl bg-background/95 backdrop-blur border-border/40 shadow-2xl min-w-[180px]">
                <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Accent Color</DropdownMenuLabel>
                <div className="grid grid-cols-4 gap-2">
                    {ACCENT_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateAccentColor(color)}
                            className={cn(
                                "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                                color.className,
                                accentColor.name === color.name ? "border-foreground" : "border-transparent"
                            )}
                            title={color.name}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-widest">Theme</TooltipContent>
        </Tooltip>
      </div>

      {user && (
        <>
            <div className="w-px h-5 bg-border/40 mx-0.5" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-muted/50 transition-all group">
                        <Avatar className="h-8 w-8 border border-border/40 group-hover:border-primary/50 transition-colors">
                            <AvatarImage src={user.image} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
                            <span className="text-xs font-bold tracking-tight">{user.name}</span>
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold local-jetbrains-mono">Admin</span>
                        </div>
                        <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-background/95 backdrop-blur border-border/40 shadow-2xl mt-2">
                    <DropdownMenuLabel className="flex flex-col p-2">
                        <span className="text-sm font-bold">{user.name}</span>
                        <span className="text-xs text-muted-foreground font-normal truncate">{user.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/40" />
                    <DropdownMenuItem
                        onClick={() => router.push("/settings")}
                        className="rounded-xl p-2 cursor-pointer focus:bg-primary/10 focus:text-primary"
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border/40" />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="rounded-xl p-2 cursor-pointer focus:bg-destructive/10 focus:text-destructive text-destructive"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
      )}
    </div>
  );
}
