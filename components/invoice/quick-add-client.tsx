"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/actions/clients";
import { toast } from "sonner";
import { Plus, X, UserPlus, Loader2 } from "lucide-react";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";

const clientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().optional(),
	address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface QuickAddClientProps {
	onClientAdded: (client: { id: string; name: string }) => void;
}

export function QuickAddClient({ onClientAdded }: QuickAddClientProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	async function onSubmit(values: ClientFormValues) {
		setIsSubmitting(true);
		try {
			const result = await createClient(values);
			toast.success("Client added successfully");
			onClientAdded({ id: result.id, name: values.name });
			setIsOpen(false);
			form.reset();
		} catch (error) {
			toast.error("Failed to add client");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (!isOpen) {
		return (
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={() => setIsOpen(true)}
				className="h-9 rounded-lg border-primary/20 text-primary hover:bg-primary/5 transition-all group"
			>
				<Plus size={14} className="mr-1 group-hover:rotate-90 transition-transform" />
				Quick Add
			</Button>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
			<GlassCard className="w-full max-w-md p-0 overflow-hidden border-border/40 shadow-2xl">
				<div className="p-6 border-b border-border/40 bg-card/50 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-primary/10 text-primary">
							<UserPlus size={18} />
						</div>
						<h2 className="text-xl font-bold mozilla-headline">Quick Add Client</h2>
					</div>
					<button
						onClick={() => setIsOpen(false)}
						className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
					>
						<X size={18} />
					</button>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1">Full Name</label>
						<Input {...form.register("name")} placeholder="John Doe" className="h-11 rounded-xl bg-background/50 border-border/40" />
						{form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
					</div>
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1">Email</label>
						<Input {...form.register("email")} type="email" placeholder="john@example.com" className="h-11 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1">Phone</label>
						<Input {...form.register("phone")} placeholder="+1 234 567 890" className="h-11 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1">Address</label>
						<textarea
							{...form.register("address")}
							className="flex min-h-[80px] w-full rounded-xl border border-border/40 bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
							placeholder="Client address..."
						/>
					</div>
					<div className="flex gap-3 pt-2">
						<Button
							type="button"
							variant="ghost"
							className="flex-1 rounded-xl h-12"
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="flex-[2] rounded-xl h-12 bg-primary hover:bg-primary-focus text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
						>
							{isSubmitting ? <Loader2 className="animate-spin mr-2" size={18} /> : <Plus className="mr-2" size={18} />}
							Add Client
						</Button>
					</div>
				</form>
			</GlassCard>
		</div>
	);
}
