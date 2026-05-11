import { getInvoiceById } from "@/actions/invoices";
import { db } from "@/lib/db";
import { businessSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { InvoicePreview } from "@/components/invoice/invoice-preview";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowLeft, ReceiptText, FileEdit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PDFDownloadButton } from "@/components/pdf-template/pdf-download-button";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
	const invoice = await getInvoiceById(id);

	if (!invoice) {
		notFound();
	}

	const [business] = await db.select().from(businessSettings).where(eq(businessSettings.userId, invoice.userId));

	return (
		<div className="space-y-10 py-8 animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-2">
                <Link
                    href="/invoices"
                    className="h-10 w-10 rounded-full border border-border/40 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                    Back to Invoices
                </span>
            </div>

			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<h1 className="text-4xl md:text-5xl font-black mozilla-headline tracking-tight flex items-center gap-4">
                        <ReceiptText className="h-10 w-10 text-primary shrink-0" />
                        {invoice.invoiceNumber}
                    </h1>
					<p className="text-muted-foreground google-sans">
                        Previewing invoice for <span className="text-foreground font-bold">{invoice.client.name}</span>
                    </p>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<Button variant="secondary" asChild className="rounded-full h-12 px-6 font-bold google-sans border border-border/40 bg-card/60 backdrop-blur-xl">
						<Link href={`/invoices/${invoice.id}/edit`}>
							<FileEdit className="mr-2 h-5 w-5" />
							Edit
						</Link>
					</Button>
					<Button variant="secondary" className="rounded-full h-12 px-6 font-bold google-sans border border-border/40 bg-card/60 backdrop-blur-xl text-rose-500 hover:text-rose-600">
						<Trash2 className="mr-2 h-5 w-5" />
						Delete
					</Button>
					<PDFDownloadButton business={business} client={invoice.client} invoice={invoice} />
				</div>
			</div>

            <div className="max-w-4xl mx-auto">
			    <InvoicePreview business={business} client={invoice.client} invoice={invoice} />
            </div>
		</div>
	);
}
