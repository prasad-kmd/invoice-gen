"use client";

import localFont from "next/font/local";
import "./globals.css";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const mozillaHeadline = localFont({
	src: [
		{
			path: "../public/fonts/MozillaHeadline-Regular.woff2",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-mozilla-headline",
	display: "swap",
});

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en" className={mozillaHeadline.variable}>
			<body className="antialiased bg-background text-foreground min-h-screen flex items-center justify-center p-4">
				<div className="max-w-md w-full text-center space-y-8">
                    <div className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-3xl bg-destructive/10 flex items-center justify-center text-destructive mb-8 border border-destructive/20 animate-pulse">
                            <AlertTriangle size={40} />
                        </div>
                        <h1 className="text-4xl font-black mozilla-headline tracking-tighter mb-4 text-destructive">FATAL_ERROR</h1>
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] mb-8">Global Process Exception</p>
                    </div>

                    <div className="bg-black/10 p-6 rounded-2xl border border-border/40 text-left mb-8">
                        <p className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest mb-3">Diagnostics</p>
                        <code className="text-xs text-destructive/90 break-all font-mono leading-relaxed">
                            {error.stack || error.message || "No stack trace available."}
                        </code>
                    </div>

					<Button
						onClick={() => reset()}
						className="w-full h-14 rounded-full bg-destructive text-destructive-foreground font-black tracking-widest text-xs uppercase transition-all hover:scale-105 shadow-xl shadow-destructive/20"
					>
						<RefreshCcw className="mr-2 h-4 w-4" />
						Reboot Application
					</Button>
				</div>
			</body>
		</html>
	);
}
