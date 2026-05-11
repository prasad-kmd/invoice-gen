"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";
import Link from "next/link";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none" />

			<GlassCard className="w-full max-w-md p-12 text-center relative z-10 border-destructive/20 bg-destructive/5">
				<div className="flex flex-col items-center mb-8">
					<div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-6">
						<AlertTriangle size={32} />
					</div>
					<MicroBadge className="mb-4 bg-destructive/10 text-destructive border-destructive/20">System Error</MicroBadge>
					<h1 className="text-3xl font-black mozilla-headline tracking-tighter mb-4">KERNEL PANIC</h1>
					<p className="text-muted-foreground local-inter text-sm mb-2">
						A critical exception has occurred in the application layer.
					</p>
                    <code className="block p-3 rounded-lg bg-black/20 text-[10px] local-jetbrains-mono text-destructive/80 break-all text-left">
                        {error.message || "Unknown error detected"}
                    </code>
				</div>

				<div className="flex flex-col gap-3">
					<Button
						onClick={() => reset()}
						className="flex items-center justify-center gap-2 h-12 rounded-xl bg-destructive text-destructive-foreground font-bold transition-all hover:scale-[1.02]"
					>
						<RefreshCcw size={18} />
						Attempt Recovery
					</Button>
					<Link
						href="/"
						className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card/50 text-foreground font-bold transition-all hover:bg-muted"
					>
						<Home size={18} />
						Return to Base
					</Link>
				</div>
			</GlassCard>
		</div>
	);
}
