"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { User, Github, Bell } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function FloatingNavbar() {
	return (
		<div className="fixed top-8 right-8 z-60 hidden lg:flex items-center gap-3 p-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-border/60 shadow-xl">
			<ThemeToggle />
			<div className="w-px h-6 bg-border/60 mx-1" />
			<Link
				href="https://github.com/prasad-kmd/invoice-gen"
				target="_blank"
				className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
			>
				<FaGithub className="h-4 w-4" />
			</Link>
            <button className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95 relative">
				<Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
			</button>
			<button className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95">
				<User className="h-4 w-4" />
			</button>
		</div>
	);
}
