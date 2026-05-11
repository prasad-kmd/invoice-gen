"use client";

import { usePathname } from "next/navigation";
import {
  Plus,
  LogOut,
  Palette
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

export function FloatingNavbar({
  className,
  isMobileSidebar = false,
}: {
  className?: string;
  isMobileSidebar?: boolean;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
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

  const navItems = [
    { name: "New Invoice", href: "/invoices/new", icon: Plus },
    { name: "New Client", href: "/clients/new", icon: Plus },
  ];

  return (
    <div
      className={cn(
        "fixed z-50 flex items-center gap-2 p-1 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg transition-all duration-300",
        scrolled ? "top-4 right-4" : "top-6 right-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 px-1">
        {navItems.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <button
                onClick={() => router.push(item.href)}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{item.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="w-px h-4 bg-border mx-1" />

      <div className="flex items-center gap-1 px-1 relative">
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                onClick={() => setShowAccentPicker(!showAccentPicker)}
                className={cn(
                    "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
                    showAccentPicker && "bg-muted text-primary"
                )}
                >
                <Palette className="h-4 w-4" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Accent Color</TooltipContent>
        </Tooltip>

        <AnimatePresence>
            {showAccentPicker && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 p-2 rounded-2xl bg-background/95 backdrop-blur border border-border shadow-xl grid grid-cols-4 gap-2 min-w-[140px]"
                >
                    {ACCENT_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => {
                                updateAccentColor(color);
                                setShowAccentPicker(false);
                            }}
                            className={cn(
                                "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                                color.className,
                                accentColor.name === color.name ? "border-foreground" : "border-transparent"
                            )}
                            title={color.name}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M22 12h2" />
                  <path d="m4.93 19.07 1.41-1.41" />
                  <path d="m17.66 6.34 1.41-1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Toggle Theme</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-muted text-destructive hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Logout</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
