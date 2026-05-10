import { getInvoiceById } from "@/actions/invoices";
import { db } from "@/lib/db";
import { businessSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PDFDownloadButton } from "@/components/pdf-template/pdf-download-button";

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
    const id = (await params).id;
	const invoice = await getInvoiceById(id);

	if (!invoice) {
		notFound();
	}

	const [business] = await db.select().from(businessSettings).where(eq(businessSettings.userId, invoice.userId));

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Invoice {invoice.invoiceNumber}</h1>
					<p className="text-muted-foreground">Manage and preview this invoice.</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" asChild>
						<Link href={`/invoices/${invoice.id}/edit`}>
							<Edit className="mr-2 h-4 w-4" />
							Edit
						</Link>
					</Button>
					<Button variant="destructive">
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</Button>
					<PDFDownloadButton business={business} client={invoice.client} invoice={invoice} />
				</div>
			</div>

			<InvoicePreview business={business} client={invoice.client} invoice={invoice} />
		</div>
	);
}
