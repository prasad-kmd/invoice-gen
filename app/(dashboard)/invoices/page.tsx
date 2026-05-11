import { getInvoices } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreHorizontal, FileText } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }: { searchParams: { q?: string, status?: string } }) {
    const params = await searchParams;
	const invoicesList = await getInvoices({
		q: params.q,
		status: params.status,
	});

	return (
		<div className="space-y-10">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <MicroBadge className="mb-2">Billing</MicroBadge>
                    <h1 className="text-4xl font-black mozilla-headline tracking-tighter">Invoices</h1>
                </div>
				<Button asChild className="rounded-full h-12 px-6 bg-primary hover:bg-primary-focus text-primary-foreground font-bold transition-all hover:scale-105">
					<Link href="/invoices/new">
						<Plus className="mr-2 h-4 w-4" />
						Create Invoice
					</Link>
				</Button>
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<div className="relative flex-1 min-w-[300px]">
					<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input
                            name="q"
                            placeholder="Search by invoice #, client name..."
                            className="pl-12 h-12 rounded-xl bg-card/50 border-border/40 focus:ring-primary/20 transition-all local-inter"
                            defaultValue={params.q}
                        />
					</form>
				</div>
                <Button variant="outline" className="h-12 rounded-xl px-5 border-border/40 bg-card/30 backdrop-blur-sm hover:bg-muted font-medium transition-all">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
			</div>

			<GlassCard className="p-0 border-border/40 overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-border/40 bg-card/50">
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Invoice #</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Client</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Issue Date</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Status</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14 text-right">Total</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14 text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoicesList.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="h-40 text-center text-muted-foreground local-inter">
										No invoices found.
									</TableCell>
								</TableRow>
							) : (
								invoicesList.map((invoice) => (
									<TableRow key={invoice.id} className="hover:bg-muted/50 transition-colors border-border/40">
										<TableCell className="px-6 py-4">
											<Link href={`/invoices/${invoice.id}`} className="group flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <FileText size={16} />
                                                </div>
                                                <span className="font-bold local-jetbrains-mono text-primary group-hover:underline">
												    {invoice.invoiceNumber}
											    </span>
											</Link>
										</TableCell>
										<TableCell className="px-6 py-4 font-medium local-inter text-foreground/80">
											{invoice.clientName}
										</TableCell>
										<TableCell className="px-6 py-4 text-xs text-muted-foreground local-jetbrains-mono uppercase tracking-tight">
											{formatDate(invoice.issueDate)}
										</TableCell>
										<TableCell className="px-6 py-4">
											<Badge
												className="local-jetbrains-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-md"
												variant={
													invoice.status === "paid"
														? "success"
														: invoice.status === "overdue"
															? "destructive"
															: invoice.status === "sent"
																? "warning"
																: "secondary"
												}
											>
												{invoice.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4 text-right font-black mozilla-headline tracking-tight text-lg">
											{formatCurrency(invoice.totalAmount)}
										</TableCell>
										<TableCell className="px-6 py-4 text-right">
											<Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" asChild>
                                                <Link href={`/invoices/${invoice.id}`}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Link>
                                            </Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</GlassCard>
		</div>
	);
}
