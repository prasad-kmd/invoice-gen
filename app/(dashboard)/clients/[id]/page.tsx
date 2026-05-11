import { getClientById } from "@/actions/clients";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Receipt, ArrowRight, FileEdit, ArrowLeft } from "lucide-react";

import { getSettings } from "@/actions/settings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
	const client = await getClientById(id);
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const settings = await getSettings(session?.user.id!);
    const currency = settings?.currency || "LKR";

	if (!client) {
		notFound();
	}

    const totalSpent = client.invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

	return (
		<div className="space-y-10 py-8 animate-in fade-in duration-700">
            <div className="flex items-center gap-4 mb-2">
                <Link 
                    href="/clients" 
                    className="h-10 w-10 rounded-full border border-border/40 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                    Back to Clients
                </span>
            </div>

			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<h1 className="text-4xl md:text-5xl font-black mozilla-headline tracking-tight">
                        {client.name}
                    </h1>
					<p className="text-muted-foreground google-sans flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {client.email || "No email provided"}
                    </p>
				</div>
				<Button variant="secondary" asChild className="rounded-full h-12 px-6 font-bold google-sans border border-border/40 bg-card/60 backdrop-blur-xl">
					<Link href={`/clients/${client.id}/edit`}>
                        <FileEdit className="mr-2 h-5 w-5" />
                        Edit Client
                    </Link>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
                <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Phone className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold mozilla-headline tracking-tight">Contact Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-muted-foreground google-sans">
                            <Phone className="h-4 w-4 text-primary/60" />
                            <span className="text-foreground font-medium">{client.phone || "N/A"}</span>
                        </div>
                        <div className="flex items-start gap-3 text-muted-foreground google-sans">
                            <MapPin className="h-4 w-4 text-primary/60 mt-1" />
                            <p className="text-foreground font-medium whitespace-pre-line">{client.address || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/60 backdrop-blur-3xl shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Receipt className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold mozilla-headline tracking-tight">Financial Summary</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                Total Invoices
                            </p>
                            <p className="text-3xl font-black mozilla-headline tracking-tighter">
                                {client.invoices.length}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                Total Spent
                            </p>
                            <p className="text-3xl font-black mozilla-headline tracking-tighter text-primary">
                                {formatCurrency(totalSpent, currency)}
                            </p>
                        </div>
                    </div>
                </div>
			</div>

            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] blur-2xl opacity-50 pointer-events-none" />
                <div className="relative rounded-[3rem] border border-border/40 bg-card/80 backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-border/40">
                        <h2 className="text-2xl font-bold mozilla-headline tracking-tight flex items-center gap-3">
                            <Receipt className="h-6 w-6 text-primary" />
                            Invoice History
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/30">
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                        Invoice #
                                    </th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                        Date
                                    </th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                        Status
                                    </th>
                                    <th className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                                        Amount
                                    </th>
                                    <th className="px-8 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {client.invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="h-32 text-center text-muted-foreground google-sans">
                                            No invoices found for this client.
                                        </td>
                                    </tr>
                                ) : (
                                    client.invoices.map((invoice) => (
                                        <tr key={invoice.id} className="group/row hover:bg-muted/20 transition-colors">
                                            <td className="px-8 py-4 font-bold local-jetbrains-mono text-sm">
                                                {invoice.invoiceNumber}
                                            </td>
                                            <td className="px-8 py-4 text-muted-foreground google-sans text-sm">
                                                {formatDate(invoice.issueDate)}
                                            </td>
                                            <td className="px-8 py-4">
                                                <span
                                                    className={cn(
                                                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                        invoice.status === "paid" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                                        invoice.status === "overdue" && "bg-rose-500/10 text-rose-500 border-rose-500/20",
                                                        invoice.status === "sent" && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                                        invoice.status === "draft" && "bg-muted/10 text-muted-foreground border-muted/20"
                                                    )}
                                                >
                                                    {invoice.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right font-bold local-jetbrains-mono text-sm">
                                                {formatCurrency(invoice.totalAmount, currency)}
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <Link
                                                    href={`/invoices/${invoice.id}`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-muted/20 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                                                >
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
		</div>
	);
}
