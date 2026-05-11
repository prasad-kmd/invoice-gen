"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function FloatingNavbar() {
	return (
		<div className="fixed top-6 right-6 z-60 hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-background/80 backdrop-blur border border-border shadow-lg">
			<ThemeToggle />
			<div className="w-px h-6 bg-border mx-1" />
			<Link
				href="https://github.com/prasad-kmd/invoice-gen"
				target="_blank"
				className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
			>
				<FaGithub className="h-4 w-4" />
			</Link>
			<button className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
				<User className="h-4 w-4" />
			</button>
		</div>
	);
}
