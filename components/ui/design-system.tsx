import * as React from "react";
import { cn } from "@/lib/utils";

const GlassCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"bg-card/30 backdrop-blur-xl border border-border/40 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:border-primary/40 hover:bg-card/50 hover:-translate-y-2",
			className
		)}
		{...props}
	/>
));
GlassCard.displayName = "GlassCard";

const BentoCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"p-5 rounded-xl border border-border bg-card transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
			className
		)}
		{...props}
	/>
));
BentoCard.displayName = "BentoCard";

const MicroBadge = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn(
			"text-[9px] font-bold uppercase tracking-[0.2em] font-mono bg-primary/5 border border-primary/10 rounded-full px-3 py-1 text-muted-foreground transition-colors hover:text-primary hover:border-primary/30",
			className
		)}
		{...props}
	/>
));
MicroBadge.displayName = "MicroBadge";

const TechTag = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn(
			"text-[8px] font-black uppercase tracking-widest border border-primary/10 px-2.5 py-1 rounded-md bg-primary/5 text-primary/60",
			className
		)}
		{...props}
	/>
));
TechTag.displayName = "TechTag";

export { GlassCard, BentoCard, MicroBadge, TechTag };
