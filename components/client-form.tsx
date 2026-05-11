"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { createClient, updateClient } from "@/actions/clients";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Save, ArrowLeft } from "lucide-react";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";

const clientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().optional(),
	address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
	initialData?: any;
}

export function ClientForm({ initialData }: ClientFormProps) {
	const router = useRouter();
	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: initialData || {
			name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	async function onSubmit(values: ClientFormValues) {
		try {
			if (initialData) {
				await updateClient(initialData.id, values);
				toast.success("Client record updated");
			} else {
				await createClient(values);
				toast.success("New client established");
			}
			router.push("/clients");
			router.refresh();
		} catch (error) {
			toast.error("Operation failed");
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-8 pb-20">
            <div className="flex items-center gap-4 mb-10">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full hover:bg-muted"
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <MicroBadge className="mb-1">{initialData ? "Entity Update" : "Entity Creation"}</MicroBadge>
                    <h1 className="text-3xl font-black mozilla-headline tracking-tighter uppercase">
                        {initialData ? "Edit Client" : "Add New Client"}
                    </h1>
                </div>
            </div>

			<GlassCard className="p-0 border-border/40 overflow-hidden">
                <div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <User size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mozilla-headline uppercase tracking-tight">Identity Data</h2>
                        <p className="text-[10px] text-muted-foreground local-jetbrains-mono uppercase tracking-widest mt-0.5">Primary contact information</p>
                    </div>
                </div>
				<CardContent className="p-8 space-y-6">
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1 flex items-center gap-2">
                            <User size={10} className="text-primary" /> Full Name
                        </label>
						<Input {...form.register("name")} placeholder="Client Name" className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 transition-all" />
						{form.formState.errors.name && (
							<p className="text-xs text-destructive font-mono uppercase tracking-tighter">{form.formState.errors.name.message}</p>
						)}
					</div>
					<div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1 flex items-center gap-2">
                                <Mail size={10} className="text-primary" /> Email Address
                            </label>
                            <Input {...form.register("email")} type="email" placeholder="client@example.com" className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 transition-all" />
                            {form.formState.errors.email && (
                                <p className="text-xs text-destructive font-mono uppercase tracking-tighter">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1 flex items-center gap-2">
                                <Phone size={10} className="text-primary" /> Phone Number
                            </label>
                            <Input {...form.register("phone")} placeholder="+1 (555) 000-0000" className="h-12 rounded-xl bg-background/50 border-border/40 focus:ring-primary/20 transition-all" />
                        </div>
                    </div>
					<div className="space-y-2">
						<label className="text-[10px] font-bold local-jetbrains-mono uppercase tracking-[0.2em] text-muted-foreground px-1 flex items-center gap-2">
                            <MapPin size={10} className="text-primary" /> Physical Address
                        </label>
						<textarea
							{...form.register("address")}
							className="flex min-h-[120px] w-full rounded-2xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
							placeholder="Client physical location details..."
						/>
					</div>
				</CardContent>
			</GlassCard>

            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    className="h-14 px-10 rounded-full bg-primary hover:bg-primary-focus text-primary-foreground font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-xl shadow-primary/20"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {initialData ? "Commit Changes" : "Create Entity"}
                </Button>
            </div>
		</form>
	);
}
