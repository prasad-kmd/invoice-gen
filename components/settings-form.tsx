"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Save } from "lucide-react";

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
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
	userId: string;
	initialData?: any;
}

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
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Business Profile</CardTitle>
					<CardDescription>This information will appear on all your invoices.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<label className="text-sm font-medium">Business Name</label>
						<Input {...form.register("businessName")} placeholder="e.g. PC Pro Repair" />
						{form.formState.errors.businessName && <p className="text-xs text-destructive">{form.formState.errors.businessName.message}</p>}
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Email</label>
						<Input {...form.register("email")} type="email" placeholder="tech@pcpro.com" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Phone</label>
						<Input {...form.register("phone")} placeholder="+1 (555) 000-0000" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Website</label>
						<Input {...form.register("website")} placeholder="https://pcpro.com" />
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-sm font-medium">Address</label>
						<Input {...form.register("address")} placeholder="123 Tech Lane, Silicon Valley, CA" />
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-sm font-medium">Logo URL</label>
						<Input {...form.register("logoUrl")} placeholder="https://pcpro.com/logo.png" />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Invoice Defaults</CardTitle>
					<CardDescription>Default values and formatting for new invoices.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<label className="text-sm font-medium">Invoice Prefix</label>
						<Input {...form.register("invoicePrefix")} />
					</div >
					<div className="space-y-2">
						<label className="text-sm font-medium">Invoice Padding</label>
						<Input {...form.register("invoicePadding", { valueAsNumber: true })} type="number" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Default Tax Rate (%)</label>
						<Input {...form.register("defaultTaxRate", { valueAsNumber: true })} type="number" step="0.01" />
					</div>
					<div className="col-span-2 space-y-2">
						<label className="text-sm font-medium">Default Payment Terms</label>
						<Input {...form.register("defaultPaymentTerms")} placeholder="Payment is due within 30 days." />
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button type="submit" size="lg">
					<Save className="mr-2 h-4 w-4" />
					Save Settings
				</Button>
			</div>
		</form>
	);
}
