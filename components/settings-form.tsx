"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Save, Building2, Receipt, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const { isSubmitting } = form.formState;

  async function onSubmit(values: SettingsFormValues) {
    try {
      await updateSettings(userId, values);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  }

  const SectionHeader = ({ icon: Icon, title, description }: any) => (
    <div className="flex items-start gap-4 mb-8">
      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-bold mozilla-headline tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground google-sans">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-8 md:p-12 rounded-[3rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-2xl">
        <SectionHeader
          icon={Building2}
          title="Business Profile"
          description="This information will appear on all your generated invoices."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Business Name
            </label>
            <input
              {...form.register("businessName")}
              placeholder="e.g. PC Pro Repair"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
            {form.formState.errors.businessName && (
              <p className="text-xs font-bold text-rose-500 mt-1 local-jetbrains-mono">
                {form.formState.errors.businessName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Business Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="tech@pcpro.com"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Phone Number
            </label>
            <input
              {...form.register("phone")}
              placeholder="+1 (555) 000-0000"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Website URL
            </label>
            <input
              {...form.register("website")}
              placeholder="https://pcpro.com"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Physical Address
            </label>
            <textarea
              {...form.register("address")}
              placeholder="123 Tech Lane, Silicon Valley, CA"
              rows={3}
              className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans resize-none"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Logo URL
            </label>
            <input
              {...form.register("logoUrl")}
              placeholder="https://pcpro.com/logo.png"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 rounded-[3rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-2xl">
        <SectionHeader
          icon={Receipt}
          title="Invoice Defaults"
          description="Configure default settings for every new invoice you create."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Invoice Prefix
            </label>
            <input
              {...form.register("invoicePrefix")}
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Invoice Number Padding
            </label>
            <input
              {...form.register("invoicePadding", { valueAsNumber: true })}
              type="number"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Default Tax Rate (%)
            </label>
            <input
              {...form.register("defaultTaxRate", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">
              Default Payment Terms
            </label>
            <input
              {...form.register("defaultPaymentTerms")}
              placeholder="Payment is due within 30 days."
              className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="rounded-full h-16 px-12 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Save className="mr-3 h-5 w-5" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
