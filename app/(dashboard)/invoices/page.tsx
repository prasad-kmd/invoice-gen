import { getInvoices } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ReceiptText, ArrowRight, Clock, CheckCircle2, AlertCircle, FileEdit } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

import { getSettings } from "@/actions/settings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const settings = await getSettings(session?.user.id!);
  const currency = settings?.currency || "LKR";

  const params = await searchParams;
  const invoicesList = await getInvoices({
    q: params.q,
    status: params.status,
  });

  return (
    <div className="space-y-10 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black mozilla-headline tracking-tight">
            Invoices
          </h1>
          <p className="text-muted-foreground google-sans">
            Track and manage your repair service billing.
          </p>
        </div>
        <Button asChild className="rounded-full h-12 px-6 font-bold google-sans shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
          <Link href="/invoices/new">
            <Plus className="mr-2 h-5 w-5" />
            Create New Invoice
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 max-w-4xl">
        <div className="relative group flex-1 w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <form className="w-full">
            <input
              name="q"
              type="text"
              placeholder="Search by invoice # or client name..."
              defaultValue={params.q}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card/50 backdrop-blur-md border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
            />
          </form>
        </div>
        <Button variant="secondary" className="h-14 px-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-md font-bold google-sans">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoicesList.length === 0 ? (
          <div className="col-span-full py-20 text-center rounded-[2.5rem] border border-dashed border-border/60">
            <ReceiptText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground google-sans">No invoices found matching your criteria.</p>
          </div>
        ) : (
          invoicesList.map((invoice) => (
            <div key={invoice.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <div className="relative h-full p-6 rounded-[2rem] border border-border/40 bg-card/60 backdrop-blur-xl shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/40 group-hover:bg-card/80 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <div className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center",
                            invoice.status === 'paid' ? "bg-emerald-500/10 text-emerald-500" :
                            invoice.status === 'overdue' ? "bg-rose-500/10 text-rose-500" :
                            "bg-blue-500/10 text-blue-500"
                        )}>
                            <ReceiptText className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                             <span
                                className={cn(
                                    "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                                    invoice.status === "paid" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                    invoice.status === "overdue" && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                                    invoice.status === "sent" && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                    invoice.status === "draft" && "bg-muted/10 text-muted-foreground border-muted/20"
                                )}
                            >
                                {invoice.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-bold mozilla-headline tracking-tight group-hover:text-primary transition-colors">
                            {invoice.invoiceNumber}
                        </h3>
                        <p className="text-sm font-medium google-sans mt-1">
                            {invoice.clientName}
                        </p>
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                        <div className="flex items-center justify-between text-xs google-sans">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Clock className="h-3 w-3" /> Issued
                            </span>
                            <span className="font-medium">{formatDate(invoice.issueDate)}</span>
                        </div>
                        {invoice.dueDate && (
                            <div className="flex items-center justify-between text-xs google-sans">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <AlertCircle className="h-3 w-3" /> Due
                                </span>
                                <span className="font-medium">{formatDate(invoice.dueDate)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border/40">
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono mb-1">
                                Total Amount
                            </p>
                            <p className="text-xl font-bold local-jetbrains-mono">
                                {formatCurrency(invoice.totalAmount, currency)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                             <Link
                                href={`/invoices/${invoice.id}`}
                                className="h-10 w-10 rounded-full border border-border/40 bg-muted/20 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all"
                                title="View Details"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                             <Link
                                href={`/invoices/${invoice.id}/edit`}
                                className="h-10 w-10 rounded-full border border-border/40 bg-muted/20 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all"
                                title="Edit Invoice"
                            >
                                <FileEdit className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
