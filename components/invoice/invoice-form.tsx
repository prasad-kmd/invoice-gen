"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice, updateInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, FileText, Users, Calculator, MessageSquare, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InvoicePreview } from "./invoice-preview";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import * as z from "zod";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";
import { QuickAddClient } from "./quick-add-client";

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
	currency: z.string().min(1),
	items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

interface InvoiceFormProps {
	userId: string;
	clients: any[];
	business: any;
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

export function InvoiceForm({ userId, clients: initialClients, business, initialData }: InvoiceFormProps) {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
	const [clients, setClients] = useState(initialClients);

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
			currency: business?.defaultCurrency || "LKR",
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
	const watchedCurrency = form.watch("currency");

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

	return (
		<div className="grid gap-10 lg:grid-cols-2 pb-20">
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<GlassCard className="p-0 border-border/40 overflow-hidden">
                    <div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Users size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mozilla-headline">Client & Schedule</h2>
                            <p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Who and when</p>
                        </div>
                    </div>
					<CardContent className="p-8 grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<div className="flex items-center justify-between px-1">
								<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground">Client</label>
								<QuickAddClient
									onClientAdded={(newClient) => {
										setClients(prev => [newClient, ...prev]);
										form.setValue("clientId", newClient.id);
									}}
								/>
							</div>
							<select
								{...form.register("clientId")}
								className="flex h-12 w-full rounded-xl border border-border/40 bg-background/50 px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
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
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Status</label>
							<select
								{...form.register("status")}
								className="flex h-12 w-full rounded-xl border border-border/40 bg-background/50 px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
							>
								{["draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
									<option key={s} value={s}>
										{s.toUpperCase()}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Issue Date</label>
							<Input
								type="date"
								{...form.register("issueDate", { valueAsDate: true })}
								className="h-12 rounded-xl bg-background/50 border-border/40"
								defaultValue={form.getValues("issueDate")?.toISOString().split("T")[0]}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Due Date</label>
							<Input
								type="date"
								{...form.register("dueDate", { valueAsDate: true })}
								className="h-12 rounded-xl bg-background/50 border-border/40"
								defaultValue={form.getValues("dueDate")?.toISOString().split("T")[0]}
							/>
						</div>
                        <div className="space-y-2">
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Currency</label>
							<select
                                {...form.register("currency")}
                                className="flex h-12 w-full rounded-xl border border-border/40 bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
                            >
								{currencies.map((c) => (
									<option key={c.code} value={c.code}>
										{c.code} - {c.name}
									</option>
								))}
							</select>
						</div>
					</CardContent>
				</GlassCard>

				<GlassCard className="p-0 border-border/40 overflow-hidden">
                    <div className="p-6 border-b border-border/40 bg-card/50 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mozilla-headline">Line Items</h2>
                                <p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Services & Parts</p>
                            </div>
                        </div>
						<Button type="button" size="sm" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })} className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-none px-4">
							<Plus className="mr-1.5 h-4 w-4" />
							Add
						</Button>
                    </div>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent border-border/40 bg-muted/30">
									<TableHead className="google-sans text-[10px] uppercase tracking-widest px-6 h-12">Description</TableHead>
									<TableHead className="google-sans text-[10px] uppercase tracking-widest px-4 h-12 w-24 text-center">Qty</TableHead>
									<TableHead className="google-sans text-[10px] uppercase tracking-widest px-4 h-12 w-32 text-right">Price</TableHead>
									<TableHead className="google-sans text-[10px] uppercase tracking-widest px-6 h-12 w-16"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{fields.map((field, index) => (
									<TableRow key={field.id} className="border-border/40">
										<TableCell className="px-6 py-4">
											<Input {...form.register(`items.${index}.description`)} placeholder="Service description" className="bg-transparent border-none focus-visible:ring-0 px-0 h-8" />
										</TableCell>
										<TableCell className="px-4 py-4">
											<Input
												type="number"
												step="1"
												{...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                                                className="bg-muted/30 border-border/20 text-center h-8 px-1"
											/>
										</TableCell>
										<TableCell className="px-4 py-4">
											<Input
												type="number"
												step="0.01"
												{...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                                                className="bg-muted/30 border-border/20 text-right h-8 px-1"
											/>
										</TableCell>
										<TableCell className="px-6 py-4 text-right">
											<Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors">
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</GlassCard>

				<GlassCard className="p-0 border-border/40 overflow-hidden">
                    <div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Calculator size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mozilla-headline">Financial Summary</h2>
                            <p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Totals & Adjustments</p>
                        </div>
                    </div>
					<CardContent className="p-8 space-y-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-2">
								<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Tax Rate (%)</label>
								<Input type="number" step="0.01" {...form.register("taxRate", { valueAsNumber: true })} className="h-12 rounded-xl bg-background/50 border-border/40" />
							</div>
							<div className="space-y-2">
								<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Discount Amount</label>
								<Input type="number" step="0.01" {...form.register("discountAmount", { valueAsNumber: true })} className="h-12 rounded-xl bg-background/50 border-border/40" />
							</div>
						</div>
						<div className="space-y-3 pt-6 border-t border-border/40">
							<div className="flex justify-between items-center px-2">
								<span className="text-sm text-muted-foreground google-sans uppercase tracking-widest">Subtotal</span>
								<span className="font-bold local-jetbrains-mono">{formatCurrency(subtotal, watchedCurrency)}</span>
							</div>
							<div className="flex justify-between items-center px-2">
								<span className="text-sm text-muted-foreground google-sans uppercase tracking-widest">Tax ({watchedTaxRate}%)</span>
								<span className="font-bold local-jetbrains-mono">{formatCurrency(taxAmount, watchedCurrency)}</span>
							</div>
							<div className="flex justify-between items-center bg-primary/5 p-4 rounded-2xl border border-primary/10">
								<span className="text-lg font-black mozilla-headline tracking-tight">Total</span>
								<span className="text-2xl font-black mozilla-headline text-primary tracking-tight">{formatCurrency(total, watchedCurrency)}</span>
							</div>
						</div>
					</CardContent>
				</GlassCard>

				<GlassCard className="p-0 border-border/40 overflow-hidden">
                    <div className="p-6 border-b border-border/40 bg-card/50 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mozilla-headline">Notes & Terms</h2>
                            <p className="text-xs text-muted-foreground google-sans uppercase tracking-widest mt-0.5">Additional Details</p>
                        </div>
                    </div>
					<CardContent className="p-8 space-y-6">
						<div className="space-y-2">
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Custom Notes</label>
							<textarea
								{...form.register("customNotes")}
								className="flex min-h-[100px] w-full rounded-xl border border-border/40 bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
								placeholder="Warranty info, repair details, etc."
							/>
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground px-1">Payment Terms</label>
							<textarea
								{...form.register("paymentTerms")}
								className="flex min-h-[100px] w-full rounded-xl border border-border/40 bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all local-inter"
								placeholder="Bank details, due dates, etc."
							/>
						</div>
					</CardContent>
				</GlassCard>

				<div className="flex items-center gap-4 sticky bottom-10 lg:bottom-12 z-20">
					<Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex-1 h-14 rounded-full border-border/40 bg-card/80 backdrop-blur-xl font-bold transition-all hover:bg-muted"
                    >
						{showPreview ? (
                            <>
                                <EyeOff className="mr-2 h-5 w-5" /> Hide Preview
                            </>
                        ) : (
                            <>
                                <Eye className="mr-2 h-5 w-5" /> Show Preview
                            </>
                        )}
					</Button>
					<Button type="submit" className="flex-1 h-14 rounded-full bg-primary hover:bg-primary-focus text-primary-foreground font-black transition-all hover:scale-105 shadow-lg shadow-primary/20">
						<Save className="mr-2 h-5 w-5" />
						Save Invoice
					</Button>
				</div>
			</form>

			<div className={showPreview ? "block fixed inset-0 z-50 bg-background p-4 overflow-y-auto lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0" : "hidden lg:block"}>
				<div className="sticky top-24">
					<div className="flex items-center justify-between mb-6 lg:hidden">
                        <h3 className="text-xl font-bold mozilla-headline">Live Preview</h3>
                        <Button variant="ghost" onClick={() => setShowPreview(false)}>Close</Button>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 mb-6">
                        <MicroBadge>Instant Rendering</MicroBadge>
					    <h3 className="text-xl font-bold mozilla-headline">Real-time Preview</h3>
                    </div>
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
	);
}
