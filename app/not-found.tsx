import Link from "next/link";
import { Laptop, Home, LayoutDashboard } from "lucide-react";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

			<GlassCard className="w-full max-w-md p-12 text-center relative z-10 border-border/40">
				<div className="flex flex-col items-center mb-8">
					<div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
						<Laptop size={32} />
					</div>
					<MicroBadge className="mb-4">Error 404</MicroBadge>
					<h1 className="text-4xl font-black mozilla-headline tracking-tighter mb-4">LOST IN SPACE</h1>
					<p className="text-muted-foreground local-inter">
						The page you're looking for doesn't exist or has been moved to another dimension.
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<Link
						href="/dashboard"
						className="flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-bold transition-all hover:scale-[1.02]"
					>
						<LayoutDashboard size={18} />
						Go to Dashboard
					</Link>
					<Link
						href="/"
						className="flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-card/50 text-foreground font-bold transition-all hover:bg-muted"
					>
						<Home size={18} />
						Back to Home
					</Link>
				</div>
			</GlassCard>
		</div>
	);
}
