"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Save, Building2, Receipt, Palette, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const currencies = [
  { label: "LKR - Sri Lankan Rupee", value: "LKR" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "AUD - Australian Dollar", value: "AUD" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "SGD - Singapore Dollar", value: "SGD" },
  { label: "AED - UAE Dirham", value: "AED" },
];

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
    currency: z.string().min(1),
    showPageBorder: z.boolean(),
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
            currency: "LKR",
            showPageBorder: true,
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
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl pb-10">
			<Card className="border-none shadow-md overflow-hidden">
				<CardHeader className="bg-muted/30">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
					    <CardTitle className="font-google-sans">Business Profile</CardTitle>
                    </div>
					<CardDescription>This information will appear on all your invoices.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6 md:grid-cols-2 pt-6">
					<div className="space-y-2">
						<Label className="text-sm font-medium">Business Name</Label>
						<Input {...form.register("businessName")} placeholder="e.g. PC Pro Repair" className="bg-background" />
						{form.formState.errors.businessName && <p className="text-xs text-destructive">{form.formState.errors.businessName.message}</p>}
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-medium">Email Address</Label>
						<Input {...form.register("email")} type="email" placeholder="tech@pcpro.com" className="bg-background" />
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-medium">Phone Number</Label>
						<Input {...form.register("phone")} placeholder="+1 (555) 000-0000" className="bg-background" />
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-medium">Website</Label>
						<Input {...form.register("website")} placeholder="https://pcpro.com" className="bg-background" />
					</div>
					<div className="col-span-full space-y-2">
						<Label className="text-sm font-medium">Address</Label>
						<Input {...form.register("address")} placeholder="123 Tech Lane, Silicon Valley, CA" className="bg-background" />
					</div>
					<div className="col-span-full space-y-2">
						<Label className="text-sm font-medium">Logo URL</Label>
						<Input {...form.register("logoUrl")} placeholder="https://pcpro.com/logo.png" className="bg-background" />
					</div>
				</CardContent>
			</Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="border-none shadow-md overflow-hidden">
                    <CardHeader className="bg-muted/30">
                        <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-primary" />
                            <CardTitle className="font-google-sans">Invoice Defaults</CardTitle>
                        </div>
                        <CardDescription>Default values for new invoices.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Prefix</Label>
                                <Input {...form.register("invoicePrefix")} className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Padding</Label>
                                <Input {...form.register("invoicePadding", { valueAsNumber: true })} type="number" className="bg-background" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Default Tax Rate (%)</Label>
                            <Input {...form.register("defaultTaxRate", { valueAsNumber: true })} type="number" step="0.01" className="bg-background" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Default Payment Terms</Label>
                            <Input {...form.register("defaultPaymentTerms")} placeholder="Payment is due within 30 days." className="bg-background" />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary" />
                                <CardTitle className="font-google-sans">Localization</CardTitle>
                            </div>
                            <CardDescription>Currency and regional settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Default Currency</Label>
                                <Select
                                    onValueChange={(val) => form.setValue("currency", val)}
                                    defaultValue={form.getValues("currency")}
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencies.map((c) => (
                                            <SelectItem key={c.value} value={c.value}>
                                                {c.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-muted/30">
                            <div className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                <CardTitle className="font-google-sans">PDF Options</CardTitle>
                            </div>
                            <CardDescription>Customize the look of generated PDFs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium">Page Border</Label>
                                    <p className="text-xs text-muted-foreground">Add a subtle border to PDF pages.</p>
                                </div>
                                <Switch
                                    checked={form.watch("showPageBorder")}
                                    onCheckedChange={(checked) => form.setValue("showPageBorder", checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

			<div className="flex justify-end">
				<Button type="submit" size="lg" className="px-8 shadow-lg shadow-primary/20">
					<Save className="mr-2 h-4 w-4" />
					Save All Settings
				</Button>
			</div>
		</form>
	);
}
