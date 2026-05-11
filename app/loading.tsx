import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
			<div className="flex flex-col items-center gap-6">
				<div className="relative">
					<div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
						<Loader2 className="animate-spin" size={32} />
					</div>
					<div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-pulse" />
				</div>
				<div className="text-center">
					<h2 className="text-xl font-bold mozilla-headline tracking-tight text-foreground uppercase tracking-[0.2em]">Loading</h2>
					<p className="text-xs text-muted-foreground local-jetbrains-mono mt-1 animate-pulse">Initializing System...</p>
				</div>
			</div>
		</div>
	);
}
