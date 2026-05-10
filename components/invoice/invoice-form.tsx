"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoice, updateInvoice } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, Receipt, Calendar, User, FileText, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuickAddClient } from "./quick-add-client";
import { cn } from "@/lib/utils";

const invoiceItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be at least 0.01"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
});

const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  issueDate: z.date(),
  dueDate: z.date().optional(),
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

export function InvoiceForm({ userId, clients: initialClients, business, initialData }: InvoiceFormProps) {
  const router = useRouter();
  const [clients, setClients] = useState(initialClients);

  const form = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: initialData ? {
      ...initialData,
      issueDate: new Date(initialData.issueDate),
      dueDate: initialData.dueDate ? new Date(initialData.dueDate) : undefined,
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
  const currency = business?.currency || "LKR";

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Form Area */}
        <div className="flex-1 space-y-8">
          {/* Header Section */}
          <Card className="shadow-sm border-muted">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Receipt className="h-5 w-5" />
                <CardTitle>Invoice Basics</CardTitle>
              </div>
              <CardDescription>Primary information about this invoice.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" /> Client
                  </label>
                  <QuickAddClient onClientAdded={handleClientAdded} />
                </div>
                <Select
                  onValueChange={(val) => form.setValue("clientId", val)}
                  value={form.watch("clientId")}
                >
                  <SelectTrigger className="h-10 bg-muted/30">
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
                {form.formState.errors.clientId && <p className="text-xs text-destructive">{String(form.formState.errors.clientId.message)}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-1">
                  <LayoutList className="h-3.5 w-3.5 text-muted-foreground" /> Status
                </label>
                <Select
                  onValueChange={(val) => form.setValue("status", val as any)}
                  value={form.watch("status")}
                >
                  <SelectTrigger className="h-10 bg-muted/30">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["draft", "sent", "paid", "overdue", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Issue Date
                </label>
                <Input
                  type="date"
                  className="h-10 bg-muted/30"
                  {...form.register("issueDate", { valueAsDate: true })}
                  defaultValue={form.getValues("issueDate")?.toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Due Date (Optional)
                </label>
                <Input
                  type="date"
                  className="h-10 bg-muted/30"
                  {...form.register("dueDate", { valueAsDate: true })}
                  defaultValue={form.getValues("dueDate")?.toISOString().split("T")[0]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card className="shadow-sm border-muted overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
              <div>
                <CardTitle className="text-lg">Line Items</CardTitle>
                <CardDescription>Add services and parts provided.</CardDescription>
              </div>
              <Button type="button" size="sm" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })} className="h-8">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold text-xs uppercase tracking-wider pl-6">Description</TableHead>
                    <TableHead className="w-24 font-semibold text-xs uppercase tracking-wider">Qty</TableHead>
                    <TableHead className="w-32 font-semibold text-xs uppercase tracking-wider">Price</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id} className="group border-b">
                      <TableCell className="pl-6 py-4">
                        <Input
                          {...form.register(`items.${index}.description`)}
                          placeholder="Service or part description"
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none h-9"
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <Input
                          type="number"
                          {...form.register(`items.${index}.quantity`, { valueAsNumber: true })}
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none h-9 text-center"
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <Input
                          type="number"
                          step="0.01"
                          {...form.register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                          className="bg-transparent border-none focus-visible:ring-1 focus-visible:ring-primary shadow-none h-9 text-right font-mono"
                        />
                      </TableCell>
                      <TableCell className="pr-6 py-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {fields.length === 0 && (
                <div className="py-10 text-center text-muted-foreground flex flex-col items-center gap-2">
                    <LayoutList className="h-8 w-8 opacity-20" />
                    <p>No items added yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / Summary Area */}
        <div className="lg:w-96 space-y-8">
          <Card className="shadow-md border-primary/20 bg-card/50 backdrop-blur sticky top-24">
            <CardHeader className="border-b bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-mono">{formatCurrency(subtotal, currency)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Tax Rate (%)</label>
                        <Input
                          type="number"
                          step="0.01"
                          {...form.register("taxRate", { valueAsNumber: true })}
                          className="h-9 bg-muted/30"
                        />
                    </div>
                    <div className="text-right pb-2">
                        <span className="text-xs font-mono">{formatCurrency(taxAmount, currency)}</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Discount Amount</label>
                    <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          {...form.register("discountAmount", { valueAsNumber: true })}
                          className="h-9 bg-muted/30 pl-8"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold">-</span>
                    </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary tracking-tight">
                    {formatCurrency(total, currency)}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full h-12 text-base shadow-lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving..." : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Invoice
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10"
                  onClick={() => router.push("/invoices")}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notes & Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Custom Notes</label>
                <textarea
                  {...form.register("customNotes")}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all"
                  placeholder="Service details, technician notes, etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Payment Terms</label>
                <textarea
                  {...form.register("paymentTerms")}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transition-all"
                  placeholder="Bank details, payment deadlines..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
