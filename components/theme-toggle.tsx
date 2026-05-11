"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
			<button
				onClick={() => setTheme("light")}
				className={cn(
					"p-2 rounded-full transition-all duration-200",
					theme === "light" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
				)}
			>
				<Sun className="h-4 w-4" />
			</button>
			<button
				onClick={() => setTheme("dark")}
				className={cn(
					"p-2 rounded-full transition-all duration-200",
					theme === "dark" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
				)}
			>
				<Moon className="h-4 w-4" />
			</button>
			<button
				onClick={() => setTheme("system")}
				className={cn(
					"p-2 rounded-full transition-all duration-200",
					theme === "system" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
				)}
			>
				<Laptop className="h-4 w-4" />
			</button>
		</div>
	);
}
