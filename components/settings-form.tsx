"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Save, Building2, FileText, Globe } from "lucide-react";
import { GlassCard, BentoCard, MicroBadge } from "@/components/ui/design-system";

const settingsSchema = z.object({
	businessName: z.string().min(1, "Business name is required"),
	address: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().email().optional().or(z.literal("")),
	website: z.string().url().optional().or(z.literal("")),
	logoUrl: z.string().url().optional().or(z.literal("")),
	defaultPaymentTerms: z.string().optional(),
	defaultTaxRate: z.number().min(0),
	invoicePrefix: z.string().min(1),
	invoicePadding: z.number().min(1),
	defaultCurrency: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
	userId: string;
	initialData?: any;
}

const currencies = [
	{ code: "LKR", name: "Sri Lankan Rupee" },
	{ code: "USD", name: "US Dollar" },
	{ code: "EUR", name: "Euro" },
	{ code: "GBP", name: "British Pound" },
	{ code: "INR", name: "Indian Rupee" },
	{ code: "AUD", name: "Australian Dollar" },
];

export function SettingsForm({ userId, initialData }: SettingsFormProps) {
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsSchema),
		defaultValues: initialData || {
			businessName: "",
			address: "",
			phone: "",
			email: "",
			website: "",
			logoUrl: "",
			defaultPaymentTerms: "",
			defaultTaxRate: 0,
			invoicePrefix: "INV-",
			invoicePadding: 4,
			defaultCurrency: "LKR",
		},
	});

	async function onSubmit(values: SettingsFormValues) {
		try {
			await updateSettings(userId, values);
			toast.success("Settings saved successfully");
		} catch (error) {
			toast.error("Failed to save settings");
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
			<GlassCard className="p-0 border-border/40 overflow-hidden">
				<div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
					<div className="p-2 rounded-lg bg-primary/10 text-primary">
						<Building2 size={20} />
					</div>
					<div>
						<h2 className="text-xl font-bold mozilla-headline">Business Profile</h2>
						<p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Basic identity information</p>
					</div>
				</div>
				<CardContent className="p-8 grid gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Business Name</label>
						<Input {...form.register("businessName")} placeholder="e.g. PC Pro Repair" className="h-12 rounded-xl bg-background/50 border-border/40" />
						{form.formState.errors.businessName && <p className="text-xs text-destructive">{form.formState.errors.businessName.message}</p>}
					</div>
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Email</label>
						<Input {...form.register("email")} type="email" placeholder="tech@pcpro.com" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Phone</label>
						<Input {...form.register("phone")} placeholder="+1 (555) 000-0000" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Website</label>
						<Input {...form.register("website")} placeholder="https://pcpro.com" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Address</label>
						<Input {...form.register("address")} placeholder="123 Tech Lane, Silicon Valley, CA" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Logo URL</label>
						<Input {...form.register("logoUrl")} placeholder="https://pcpro.com/logo.png" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
				</CardContent>
			</GlassCard>

			<GlassCard className="p-0 border-border/40 overflow-hidden">
				<div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
					<div className="p-2 rounded-lg bg-primary/10 text-primary">
						<FileText size={20} />
					</div>
					<div>
						<h2 className="text-xl font-bold mozilla-headline">Invoice Defaults</h2>
						<p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Automation and formatting</p>
					</div>
				</div>
				<CardContent className="p-8 grid gap-6 md:grid-cols-2">
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Invoice Prefix</label>
						<Input {...form.register("invoicePrefix")} className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div >
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Invoice Padding</label>
						<Input {...form.register("invoicePadding", { valueAsNumber: true })} type="number" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Default Tax Rate (%)</label>
						<Input {...form.register("defaultTaxRate", { valueAsNumber: true })} type="number" step="0.01" className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
					<div className="space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Default Currency</label>
						<select
                            {...form.register("defaultCurrency")}
                            className="flex h-12 w-full rounded-xl border border-border/40 bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
                        >
							{currencies.map((c) => (
								<option key={c.code} value={c.code}>
									{c.code} - {c.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Default Payment Terms</label>
						<Input {...form.register("defaultPaymentTerms")} placeholder="Payment is due within 30 days." className="h-12 rounded-xl bg-background/50 border-border/40" />
					</div>
				</CardContent>
			</GlassCard>

			<div className="flex justify-end pb-10">
				<Button type="submit" size="lg" className="rounded-full h-14 px-10 bg-primary hover:bg-primary-focus text-primary-foreground font-black transition-all hover:scale-105 shadow-lg shadow-primary/20">
					<Save className="mr-2 h-5 w-5" />
					Save Settings
				</Button>
			</div>
		</form>
	);
}
