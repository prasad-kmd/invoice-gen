import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvoicePreviewProps {
	business: any;
	client: any;
	invoice: any;
}

export function InvoicePreview({ business, client, invoice }: InvoicePreviewProps) {
	return (
		<Card className="mx-auto w-full max-w-4xl bg-white text-black shadow-lg">
			<CardContent className="p-12">
				<div className="flex justify-between border-b pb-8">
					<div>
						{business?.logoUrl && <img src={business.logoUrl} alt="Logo" className="mb-4 h-16 w-auto" />}
						<h2 className="text-2xl font-bold">{business?.businessName || "Your Business Name"}</h2>
						<p className="text-muted-foreground whitespace-pre-line">{business?.address}</p>
						<p className="text-muted-foreground">{business?.phone}</p>
						<p className="text-muted-foreground">{business?.email}</p>
					</div>
					<div className="text-right">
						<h1 className="text-4xl font-bold uppercase tracking-tighter text-primary">Invoice</h1>
						<div className="mt-4 space-y-1">
							<p className="font-semibold">Invoice #: {invoice.invoiceNumber || "DRAFT"}</p>
							<p>Date: {formatDate(invoice.issueDate || new Date())}</p>
							<p>Due Date: {formatDate(invoice.dueDate || new Date())}</p>
							<Badge variant="outline" className="mt-2 uppercase">
								{invoice.status}
							</Badge>
						</div>
					</div>
				</div>

				<div className="mt-8 grid grid-cols-2 gap-8">
					<div>
						<h3 className="mb-2 text-sm font-bold uppercase text-muted-foreground">Bill To:</h3>
						<p className="font-bold">{client?.name}</p>
						<p className="text-muted-foreground whitespace-pre-line">{client?.address}</p>
						<p className="text-muted-foreground">{client?.phone}</p>
						<p className="text-muted-foreground">{client?.email}</p>
					</div>
				</div>

				<div className="mt-12">
					<Table>
						<TableHeader className="bg-muted/50">
							<TableRow>
								<TableHead className="w-12">#</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className="text-center">Qty</TableHead>
								<TableHead className="text-right">Unit Price</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoice.items?.map((item: any, index: number) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell className="font-medium">{item.description}</TableCell>
									<TableCell className="text-center">{item.quantity}</TableCell>
									<TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
									<TableCell className="text-right font-semibold">
										{formatCurrency(item.quantity * item.unitPrice)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className="mt-12 flex justify-end">
					<div className="w-64 space-y-3">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Subtotal:</span>
							<span>{formatCurrency(invoice.subtotal || 0)}</span>
						</div>
						{invoice.discountAmount > 0 && (
							<div className="flex justify-between text-sm text-destructive">
								<span>Discount:</span>
								<span>-{formatCurrency(invoice.discountAmount)}</span>
							</div>
						)}
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Tax ({invoice.taxRate}%):</span>
							<span>{formatCurrency(invoice.taxAmount || 0)}</span>
						</div>
						<div className="flex justify-between border-t pt-3 text-lg font-bold">
							<span>Total:</span>
							<span className="text-primary">{formatCurrency(invoice.totalAmount || 0)}</span>
						</div>
					</div>
				</div>

				<div className="mt-16 grid grid-cols-2 gap-12 border-t pt-8 text-sm">
					<div>
						<h4 className="mb-2 font-bold uppercase text-muted-foreground">Notes:</h4>
						<p className="text-muted-foreground whitespace-pre-line">{invoice.customNotes || "No notes."}</p>
					</div>
					<div>
						<h4 className="mb-2 font-bold uppercase text-muted-foreground">Payment Terms:</h4>
						<p className="text-muted-foreground whitespace-pre-line">
							{invoice.paymentTerms || business?.defaultPaymentTerms || "Standard 30-day terms."}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
