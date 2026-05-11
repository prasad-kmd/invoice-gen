"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice, updateInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, ReceiptText, User, Calendar, DollarSign, FileText, LayoutPanelTop, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InvoicePreview } from "./invoice-preview";
import { formatCurrency, cn } from "@/lib/utils";
import { useState } from "react";
import * as z from "zod";

const invoiceItemSchema = z.object({
	id: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	quantity: z.number().min(0.01, "Quantity must be at least 0.01"),
	unitPrice: z.number().min(0, "Price cannot be negative"),
});

const invoiceSchema = z.object({
	clientId: z.string().min(1, "Client is required"),
	issueDate: z.date(),
	dueDate: z.date(),
	status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
	taxRate: z.number().min(0),
	discountAmount: z.number().min(0),
	customNotes: z.string().optional(),
	paymentTerms: z.string().optional(),
	items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

interface InvoiceFormProps {
	userId: string;
	clients: any[];
	business: any;
	initialData?: any;
}

export function InvoiceForm({ userId, clients, business, initialData }: InvoiceFormProps) {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);

	const form = useForm({
		resolver: zodResolver(invoiceSchema),
		defaultValues: initialData ? {
            ...initialData,
            issueDate: new Date(initialData.issueDate),
            dueDate: new Date(initialData.dueDate),
        } : {
			clientId: "",
			issueDate: new Date(),
			dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
			status: "draft",
			taxRate: business?.defaultTaxRate || 0,
			discountAmount: 0,
			customNotes: "",
			paymentTerms: business?.defaultPaymentTerms || "",
			items: [{ description: "", quantity: 1, unitPrice: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	const watchedItems = form.watch("items");
	const watchedTaxRate = form.watch("taxRate");
	const watchedDiscount = form.watch("discountAmount");

	const subtotal = watchedItems.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice || 0), 0);
	const taxAmount = (subtotal * (watchedTaxRate || 0)) / 100;
	const total = subtotal + taxAmount - (watchedDiscount || 0);

	async function onSubmit(values: any) {
		try {
			if (initialData) {
				await updateInvoice(initialData.id, values);
				toast.success("Invoice updated");
			} else {
				await createInvoice(userId, values);
				toast.success("Invoice created");
			}
			router.push("/invoices");
			router.refresh();
		} catch (error: any) {
			toast.error(error.message || "Failed to save invoice");
		}
	}

  const SectionHeader = ({ icon: Icon, title }: any) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold mozilla-headline tracking-tight">
        {title}
      </h3>
    </div>
  );

	return (
		<div className="grid gap-12 lg:grid-cols-2 animate-in fade-in duration-700">
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				{/* Invoice Details */}
				<div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
					<SectionHeader icon={ReceiptText} title="Invoice Details" />
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1 flex items-center gap-2">
								<User className="h-3 w-3" /> Client
							</label>
							<select
								{...form.register("clientId")}
								className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans appearance-none"
							>
								<option value="">Select a client</option>
								{clients.map((c) => (
									<option key={c.id} value={c.id}>
										{c.name}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1 flex items-center gap-2">
								<LayoutPanelTop className="h-3 w-3" /> Status
							</label>
							<select
								{...form.register("status")}
								className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans appearance-none"
							>
								{["draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
									<option key={s} value={s}>
										{s.toUpperCase()}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1 flex items-center gap-2">
								<Calendar className="h-3 w-3" /> Issue Date
							</label>
							<input
								type="date"
								{...form.register("issueDate", { valueAsDate: true })}
								defaultValue={form.getValues("issueDate")?.toISOString().split("T")[0]}
                className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1 flex items-center gap-2">
								<Calendar className="h-3 w-3" /> Due Date
							</label>
							<input
								type="date"
								{...form.register("dueDate", { valueAsDate: true })}
								defaultValue={form.getValues("dueDate")?.toISOString().split("T")[0]}
                className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
							/>
						</div>
					</div>
				</div>

				{/* Line Items */}
				<div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
					<div className="flex items-center justify-between mb-8">
            <SectionHeader icon={Plus} title="Line Items" />
						<Button
                type="button"
                size="sm"
                onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-none h-9 px-4 font-bold"
            >
							<Plus className="mr-2 h-4 w-4" />
							Add Item
						</Button>
					</div>
					<div className="space-y-4">
						{fields.map((field, index) => (
							<div key={field.id} className="grid grid-cols-12 gap-3 items-end p-4 rounded-2xl bg-background/30 border border-border/20">
								<div className="col-span-12 md:col-span-6 space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground local-jetbrains-mono ml-1">Description</label>
									<input
                      {...form.register(`items.${index}.description`)}
                      placeholder="Service description"
                      className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm google-sans"
                  />
								</div>
								<div className="col-span-4 md:col-span-2 space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground local-jetbrains-mono ml-1">Qty</label>
									<input
										type="number"
										step="0.01"
										{...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                    className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm local-jetbrains-mono"
									/>
								</div>
								<div className="col-span-5 md:col-span-3 space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground local-jetbrains-mono ml-1">Price</label>
									<input
										type="number"
										step="0.01"
										{...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                    className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all text-sm local-jetbrains-mono"
									/>
								</div>
								<div className="col-span-3 md:col-span-1 flex justify-end">
									<Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="hover:bg-rose-500/10 hover:text-rose-500">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Financial Summary */}
				<div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
					<SectionHeader icon={DollarSign} title="Financial Summary" />
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-2">
								<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">Tax Rate (%)</label>
								<input
                    type="number"
                    step="0.01"
                    {...form.register("taxRate", { valueAsNumber: true })}
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all local-jetbrains-mono"
                />
							</div>
							<div className="space-y-2">
								<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">Discount</label>
								<input
                    type="number"
                    step="0.01"
                    {...form.register("discountAmount", { valueAsNumber: true })}
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all local-jetbrains-mono"
                />
							</div>
						</div>
						<div className="pt-6 border-t border-border/40 space-y-3">
							<div className="flex justify-between text-sm google-sans">
								<span className="text-muted-foreground">Subtotal</span>
								<span className="font-medium">{formatCurrency(subtotal)}</span>
							</div>
							<div className="flex justify-between text-sm google-sans">
								<span className="text-muted-foreground">Tax</span>
								<span className="font-medium">{formatCurrency(taxAmount)}</span>
							</div>
              {watchedDiscount > 0 && (
                <div className="flex justify-between text-sm google-sans text-rose-500">
                  <span>Discount</span>
                  <span>-{formatCurrency(watchedDiscount)}</span>
                </div>
              )}
							<div className="flex justify-between items-end pt-2">
								<span className="text-sm font-bold uppercase tracking-widest mozilla-headline">Total</span>
								<span className="text-3xl font-black mozilla-headline tracking-tighter text-primary">
                  {formatCurrency(total)}
                </span>
							</div>
						</div>
					</div>
				</div>

				{/* Notes & Terms */}
				<div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
					<SectionHeader icon={FileText} title="Notes & Terms" />
					<div className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">Custom Notes</label>
							<textarea
								{...form.register("customNotes")}
								className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all google-sans resize-none min-h-[100px]"
								placeholder="Warranty info, additional services, etc."
							/>
						</div>
						<div className="space-y-2">
							<label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono ml-1">Payment Terms</label>
							<textarea
								{...form.register("paymentTerms")}
								className="w-full p-4 rounded-xl bg-background/50 border border-border/40 focus:border-primary/50 outline-none transition-all google-sans resize-none min-h-[100px]"
								placeholder="Bank details, payment deadlines, etc."
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end gap-4 pb-10">
					<Button
              type="button"
              variant="secondary"
              onClick={() => setShowPreview(!showPreview)}
              className="rounded-full h-14 px-8 border border-border/40 bg-card/50 backdrop-blur-xl font-bold google-sans"
          >
						{showPreview ? <><EyeOff className="mr-2 h-5 w-5" /> Hide Preview</> : <><Eye className="mr-2 h-5 w-5" /> Show Preview</>}
					</Button>
					<Button
              type="submit"
              className="rounded-full h-14 px-10 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
						<Save className="mr-3 h-5 w-5" />
						Save Invoice
					</Button>
				</div>
			</form>

			<div className={cn(
          "relative lg:block",
          showPreview ? "block" : "hidden"
      )}>
				<div className="sticky top-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Eye className="h-4 w-4" />
            </div>
					  <h3 className="text-xl font-bold mozilla-headline tracking-tight">Real-time Preview</h3>
          </div>
					<div className="scale-95 origin-top transition-all duration-500">
            <InvoicePreview
              business={business}
              client={clients.find((c) => c.id === form.watch("clientId"))}
              invoice={{
                ...form.watch(),
                subtotal,
                taxAmount,
                totalAmount: total,
              }}
            />
          </div>
				</div>
			</div>
		</div>
	);
}
