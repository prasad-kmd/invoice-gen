"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice, updateInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, Eye, EyeOff, UserPlus, Receipt, FileText, Calculator, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InvoicePreview } from "./invoice-preview";
import { formatCurrency, cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import * as z from "zod";
import { AddClientDialog } from "@/components/add-client-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    currency: z.string().optional(),
	items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

interface InvoiceFormProps {
	userId: string;
	clients: any[];
	business: any;
	initialData?: any;
}

export function InvoiceForm({ userId, clients: initialClients, business, initialData }: InvoiceFormProps) {
	const router = useRouter();
	const [showPreview, setShowPreview] = useState(false);
    const [clients, setClients] = useState(initialClients);
    const [isAddClientOpen, setIsAddClientOpen] = useState(false);

    const currency = initialData?.currency || business?.currency || "LKR";

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
            currency: business?.currency || "LKR",
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

    const handleClientAdded = (newClient: any) => {
        setClients(prev => [...prev, newClient]);
        form.setValue("clientId", newClient.id);
    };

	return (
		<div className="grid gap-8 lg:grid-cols-2 pb-20">
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<Card className="border-none shadow-md overflow-hidden">
					<CardHeader className="bg-muted/30">
                        <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-primary" />
						    <CardTitle className="font-google-sans">Invoice Details</CardTitle>
                        </div>
                        <CardDescription>Basic information for this invoice.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-6 md:grid-cols-2 pt-6">
						<div className="space-y-2 col-span-full sm:col-span-1">
							<Label className="text-sm font-medium">Client</Label>
                            <div className="flex gap-2">
                                <Select
                                    onValueChange={(val) => form.setValue("clientId", val)}
                                    value={form.watch("clientId")}
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select a client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setIsAddClientOpen(true)}
                                    title="Add New Client"
                                >
                                    <UserPlus className="h-4 w-4" />
                                </Button>
                            </div>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Status</Label>
                            <Select
                                onValueChange={(val) => form.setValue("status", val as any)}
                                value={form.watch("status")}
                            >
                                <SelectTrigger className="bg-background">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Issue Date</Label>
							<Input
								type="date"
								{...form.register("issueDate", { valueAsDate: true })}
								defaultValue={form.getValues("issueDate")?.toISOString().split("T")[0]}
                                className="bg-background"
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Due Date</Label>
							<Input
								type="date"
								{...form.register("dueDate", { valueAsDate: true })}
								defaultValue={form.getValues("dueDate")?.toISOString().split("T")[0]}
                                className="bg-background"
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-md overflow-hidden">
					<CardHeader className="bg-muted/30 flex flex-row items-center justify-between space-y-0">
						<div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <CardTitle className="font-google-sans">Line Items</CardTitle>
                        </div>
						<Button type="button" size="sm" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })} className="h-8">
							<Plus className="mr-1 h-3.5 w-3.5" />
							Add Item
						</Button>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="overflow-x-auto -mx-6 px-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="min-w-[200px]">Description</TableHead>
                                        <TableHead className="w-24">Qty</TableHead>
                                        <TableHead className="w-32 text-right">Price</TableHead>
                                        <TableHead className="w-16"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fields.map((field, index) => (
                                        <TableRow key={field.id} className="group">
                                            <TableCell className="py-2">
                                                <Input {...form.register(`items.${index}.description`)} placeholder="Service description" className="bg-background" />
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                                                    className="bg-background"
                                                />
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    {...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                                                    className="bg-background text-right font-medium"
                                                />
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-md overflow-hidden">
					<CardHeader className="bg-muted/30">
                        <div className="flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-primary" />
						    <CardTitle className="font-google-sans">Summary</CardTitle>
                        </div>
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label className="text-sm font-medium">Tax Rate (%)</Label>
								<Input type="number" step="0.01" {...form.register("taxRate", { valueAsNumber: true })} className="bg-background" />
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-medium">Discount</Label>
								<Input type="number" step="0.01" {...form.register("discountAmount", { valueAsNumber: true })} className="bg-background" />
							</div>
						</div>
						<div className="space-y-3 border-t pt-4">
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Subtotal</span>
								<span className="font-medium text-foreground">{formatCurrency(subtotal, currency)}</span>
							</div>
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Tax Amount</span>
								<span className="font-medium text-foreground">{formatCurrency(taxAmount, currency)}</span>
							</div>
							<div className="flex justify-between text-xl font-bold pt-2">
								<span>Total Amount</span>
								<span className="text-primary">{formatCurrency(total, currency)}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-md overflow-hidden">
					<CardHeader className="bg-muted/30">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
						    <CardTitle className="font-google-sans">Notes & Terms</CardTitle>
                        </div>
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<div className="space-y-2">
							<Label className="text-sm font-medium">Custom Notes</Label>
							<textarea
								{...form.register("customNotes")}
								className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all"
								placeholder="Add any additional notes for your client..."
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Payment Terms</Label>
							<textarea
								{...form.register("paymentTerms")}
								className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-all"
								placeholder="Specify bank details or payment deadlines..."
							/>
						</div>
					</CardContent>
				</Card>

				<div className="flex flex-col sm:flex-row justify-end gap-4">
					<Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex-1 sm:flex-none"
                    >
						{showPreview ? (
                            <><EyeOff className="mr-2 h-4 w-4" /> Hide Preview</>
                        ) : (
                            <><Eye className="mr-2 h-4 w-4" /> Show Preview</>
                        )}
					</Button>
					<Button type="submit" size="lg" className="flex-1 sm:flex-none shadow-lg shadow-primary/20 px-8">
						<Save className="mr-2 h-4 w-4" />
						Save Invoice
					</Button>
				</div>
			</form>

			<div className={cn("transition-all duration-300", showPreview ? "block" : "hidden lg:block")}>
				<div className="sticky top-24">
					<div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-primary rounded-full" />
					    <h3 className="text-2xl font-bold font-google-sans">Live Preview</h3>
                    </div>
					<InvoicePreview
						business={{
                            ...business,
                            currency // Override with current selection
                        }}
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

            <AddClientDialog
                open={isAddClientOpen}
                onOpenChange={setIsAddClientOpen}
                onClientAdded={handleClientAdded}
            />
		</div>
	);
}
