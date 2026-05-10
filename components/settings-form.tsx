"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Save, Building2, Receipt, Globe, Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CURRENCIES } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  currency: z.string().min(3),
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
    defaultValues: {
      businessName: initialData?.businessName || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      website: initialData?.website || "",
      logoUrl: initialData?.logoUrl || "",
      defaultPaymentTerms: initialData?.defaultPaymentTerms || "",
      defaultTaxRate: initialData?.defaultTaxRate || 0,
      invoicePrefix: initialData?.invoicePrefix || "INV-",
      invoicePadding: initialData?.invoicePadding || 4,
      currency: initialData?.currency || "LKR",
      showPageBorder: initialData?.showPageBorder || false,
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="invoices">Invoices & Tax</TabsTrigger>
          <TabsTrigger value="appearance">PDF & Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card className="shadow-sm border-muted">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Business Profile</CardTitle>
              </div>
              <CardDescription>This information will appear on all your invoices.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Business Name</label>
                <Input {...form.register("businessName")} placeholder="e.g. PC Pro Repair" className="bg-muted/30" />
                {form.formState.errors.businessName && <p className="text-xs text-destructive">{form.formState.errors.businessName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <Input {...form.register("email")} type="email" placeholder="tech@pcpro.com" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone Number</label>
                <Input {...form.register("phone")} placeholder="+1 (555) 000-0000" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Website</label>
                <Input {...form.register("website")} placeholder="https://pcpro.com" className="bg-muted/30" />
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-sm font-semibold">Business Address</label>
                <Input {...form.register("address")} placeholder="123 Tech Lane, Silicon Valley, CA" className="bg-muted/30" />
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-sm font-semibold">Logo URL</label>
                <Input {...form.register("logoUrl")} placeholder="https://pcpro.com/logo.png" className="bg-muted/30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="shadow-sm border-muted">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Receipt className="h-5 w-5 text-primary" />
                <CardTitle>Invoice Defaults</CardTitle>
              </div>
              <CardDescription>Default values and formatting for new invoices.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Currency</label>
                <Select
                  onValueChange={(val) => form.setValue("currency", val)}
                  defaultValue={form.getValues("currency")}
                >
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Default Tax Rate (%)</label>
                <Input {...form.register("defaultTaxRate", { valueAsNumber: true })} type="number" step="0.01" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Invoice Prefix</label>
                <Input {...form.register("invoicePrefix")} className="bg-muted/30" />
              </div >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Invoice Padding</label>
                <Input {...form.register("invoicePadding", { valueAsNumber: true })} type="number" className="bg-muted/30" />
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-sm font-semibold text-foreground">Default Payment Terms</label>
                <Input {...form.register("defaultPaymentTerms")} placeholder="Payment is due within 30 days." className="bg-muted/30" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="shadow-sm border-muted">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>PDF Options</CardTitle>
              </div>
              <CardDescription>Customize the look and feel of your generated PDF invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border">
                <div className="space-y-0.5">
                  <label className="text-base font-semibold">Show Page Border</label>
                  <p className="text-sm text-muted-foreground">Add a subtle 1px border around the invoice page.</p>
                </div>
                <Switch
                  checked={form.watch("showPageBorder")}
                  onCheckedChange={(val) => form.setValue("showPageBorder", val)}
                />
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-primary font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  PDFs are generated using Google Sans and Inter fonts by default.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" className="px-8 shadow-sm" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
