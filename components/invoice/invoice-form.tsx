"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice, updateInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InvoicePreview } from "./invoice-preview";
import { formatCurrency } from "@/lib/utils";
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

	return (
		<div className="grid gap-8 lg:grid-cols-2">
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Invoice Details</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium">Client</label>
							<select
								{...form.register("clientId")}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
							<label className="text-sm font-medium">Status</label>
							<select
								{...form.register("status")}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							>
								{["draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
									<option key={s} value={s}>
										{s.toUpperCase()}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Issue Date</label>
							<Input
								type="date"
								{...form.register("issueDate", { valueAsDate: true })}
								defaultValue={form.getValues("issueDate")?.toISOString().split("T")[0]}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Due Date</label>
							<Input
								type="date"
								{...form.register("dueDate", { valueAsDate: true })}
								defaultValue={form.getValues("dueDate")?.toISOString().split("T")[0]}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle>Line Items</CardTitle>
						<Button type="button" size="sm" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}>
							<Plus className="mr-2 h-4 w-4" />
							Add Item
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Description</TableHead>
									<TableHead className="w-24">Qty</TableHead>
									<TableHead className="w-32">Price</TableHead>
									<TableHead className="w-20"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{fields.map((field, index) => (
									<TableRow key={field.id}>
										<TableCell>
											<Input {...form.register(`items.${index}.description`)} placeholder="Service description" />
										</TableCell>
										<TableCell>
											<Input
												type="number"
												step="0.01"
												{...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
											/>
										</TableCell>
										<TableCell>
											<Input
												type="number"
												step="0.01"
												{...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
											/>
										</TableCell>
										<TableCell>
											<Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Financial Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Tax Rate (%)</label>
								<Input type="number" step="0.01" {...form.register("taxRate", { valueAsNumber: true })} />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Discount Amount</label>
								<Input type="number" step="0.01" {...form.register("discountAmount", { valueAsNumber: true })} />
							</div>
						</div>
						<div className="space-y-2 border-t pt-4">
							<div className="flex justify-between text-sm">
								<span>Subtotal</span>
								<span>{formatCurrency(subtotal)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Tax</span>
								<span>{formatCurrency(taxAmount)}</span>
							</div>
							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span className="text-primary">{formatCurrency(total)}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Notes & Terms</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Custom Notes</label>
							<textarea
								{...form.register("customNotes")}
								className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								placeholder="Warranty info, etc."
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Payment Terms</label>
							<textarea
								{...form.register("paymentTerms")}
								className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								placeholder="Bank details, etc."
							/>
						</div>
					</CardContent>
				</Card>

				<div className="flex justify-end gap-4">
					<Button type="button" variant="outline" onClick={() => setShowPreview(!showPreview)}>
						{showPreview ? "Hide Preview" : "Show Preview"}
					</Button>
					<Button type="submit">
						<Save className="mr-2 h-4 w-4" />
						Save Invoice
					</Button>
				</div>
			</form>

			<div className={showPreview ? "block" : "hidden lg:block"}>
				<div className="sticky top-8">
					<h3 className="mb-4 text-xl font-bold">Real-time Preview</h3>
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
