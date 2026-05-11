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
	const currency = invoice.currency || business?.defaultCurrency || "LKR";

	return (
		<Card className="mx-auto w-full max-w-4xl bg-white text-black shadow-2xl border-none overflow-hidden rounded-none">
			<div className="h-2 bg-primary" />
			<CardContent className="p-10 md:p-14">
				<div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-100 pb-10">
					<div>
						{business?.logoUrl && <img src={business.logoUrl} alt="Logo" className="mb-6 h-12 w-auto object-contain" />}
						<h2 className="text-2xl font-black mozilla-headline tracking-tight text-gray-900">{business?.businessName || "Your Business Name"}</h2>
						<div className="mt-4 space-y-1 text-sm text-gray-500 local-inter">
							<p className="whitespace-pre-line leading-relaxed">{business?.address}</p>
							<p>{business?.phone}</p>
							<p>{business?.email}</p>
							{business?.website && <p className="text-primary font-medium">{business.website}</p>}
						</div>
					</div>
					<div className="md:text-right">
						<h1 className="text-5xl font-black uppercase tracking-tighter text-primary/20">Invoice</h1>
						<div className="mt-6 space-y-1">
							<p className="text-sm font-bold local-jetbrains-mono text-gray-400 uppercase tracking-widest">Reference</p>
							<p className="text-xl font-bold local-jetbrains-mono text-gray-900">{invoice.invoiceNumber || "DRAFT"}</p>

							<div className="pt-4 grid grid-cols-2 md:block gap-4">
								<div className="space-y-1">
									<p className="text-[10px] font-bold local-jetbrains-mono text-gray-400 uppercase tracking-widest">Issue Date</p>
									<p className="text-sm font-medium">{formatDate(invoice.issueDate || new Date())}</p>
								</div>
								<div className="space-y-1 md:mt-3">
									<p className="text-[10px] font-bold local-jetbrains-mono text-gray-400 uppercase tracking-widest">Due Date</p>
									<p className="text-sm font-medium">{formatDate(invoice.dueDate || new Date())}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
					<div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
						<h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Recipient</h3>
						<div className="space-y-1">
							<p className="text-lg font-bold text-gray-900">{client?.name || "Select a client"}</p>
							<div className="text-sm text-gray-500 space-y-1 leading-relaxed">
								{client?.email && <p>{client.email}</p>}
								{client?.phone && <p>{client.phone}</p>}
								{client?.address && <p className="whitespace-pre-line mt-2">{client.address}</p>}
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-end md:items-end">
						<Badge variant="outline" className={`w-fit text-[10px] font-bold local-jetbrains-mono uppercase tracking-widest px-4 py-1.5 rounded-full border-2 ${
							invoice.status === 'paid' ? 'border-green-100 text-green-600 bg-green-50' :
							invoice.status === 'overdue' ? 'border-red-100 text-red-600 bg-red-50' :
							'border-gray-100 text-gray-400'
						}`}>
							{invoice.status || 'draft'}
						</Badge>
					</div>
				</div>

				<div className="mt-12 overflow-hidden rounded-2xl border border-gray-100">
					<Table>
						<TableHeader className="bg-gray-50">
							<TableRow className="hover:bg-transparent border-gray-100">
								<TableHead className="w-12 text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono px-6">#</TableHead>
								<TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Description</TableHead>
								<TableHead className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Qty</TableHead>
								<TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Unit Price</TableHead>
								<TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono px-6">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoice.items?.map((item: any, index: number) => (
								<TableRow key={index} className="border-gray-50 hover:bg-transparent">
									<TableCell className="px-6 text-gray-400 font-medium local-jetbrains-mono text-xs">{index + 1}</TableCell>
									<TableCell className="font-bold text-gray-800 py-5">{item.description}</TableCell>
									<TableCell className="text-center text-gray-600 font-medium">{item.quantity}</TableCell>
									<TableCell className="text-right text-gray-600 font-medium">{formatCurrency(item.unitPrice, currency)}</TableCell>
									<TableCell className="text-right font-black text-gray-900 px-6">
										{formatCurrency(item.quantity * item.unitPrice, currency)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className="mt-10 flex flex-col md:flex-row justify-between gap-10">
					<div className="flex-1 space-y-8 max-w-md">
						{invoice.customNotes && (
							<div>
								<h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Notes</h4>
								<p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed italic">“{invoice.customNotes}”</p>
							</div>
						)}
						<div>
							<h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 local-jetbrains-mono">Payment Terms</h4>
							<p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
								{invoice.paymentTerms || business?.defaultPaymentTerms || "Standard 30-day terms."}
							</p>
						</div>
					</div>

					<div className="w-full md:w-72 bg-gray-50 p-8 rounded-3xl space-y-4 border border-gray-100">
						<div className="flex justify-between text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-gray-400">
							<span>Subtotal</span>
							<span className="text-gray-900">{formatCurrency(invoice.subtotal || 0, currency)}</span>
						</div>
						{invoice.discountAmount > 0 && (
							<div className="flex justify-between text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-red-500">
								<span>Discount</span>
								<span>-{formatCurrency(invoice.discountAmount, currency)}</span>
							</div>
						)}
						<div className="flex justify-between text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-gray-400">
							<span>Tax ({invoice.taxRate}%)</span>
							<span className="text-gray-900">{formatCurrency(invoice.taxAmount || 0, currency)}</span>
						</div>
						<div className="flex justify-between border-t border-gray-200 pt-4">
							<span className="text-sm font-bold text-gray-900">Total</span>
							<div className="text-right">
								<span className="text-2xl font-black text-primary mozilla-headline tracking-tight leading-none block">
									{formatCurrency(invoice.totalAmount || 0, currency)}
								</span>
								<span className="text-[10px] font-bold text-gray-400 local-jetbrains-mono uppercase tracking-widest">
									{currency}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-20 pt-10 border-t border-gray-100 text-center">
					<p className="text-[10px] font-bold text-gray-400 local-jetbrains-mono uppercase tracking-[0.3em]">
						Thank you for your business
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
