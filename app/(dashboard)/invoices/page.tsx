import { getInvoices } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }: { searchParams: { q?: string, status?: string } }) {
    const params = await searchParams;
	const invoicesList = await getInvoices({
		q: params.q,
		status: params.status,
	});

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Invoices</h1>
				<Button asChild>
					<Link href="/invoices/new">
						<Plus className="mr-2 h-4 w-4" />
						Create Invoice
					</Link>
				</Button>
			</div>

			<div className="flex flex-wrap items-center gap-4">
				<div className="relative flex-1 min-w-[300px]">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input name="q" placeholder="Search by invoice #, client name..." className="pl-10" defaultValue={params.q} />
					</form>
				</div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice #</TableHead>
							<TableHead>Client</TableHead>
							<TableHead>Issue Date</TableHead>
							<TableHead>Due Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Total</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoicesList.length === 0 ? (
							<TableRow>
								<TableCell colSpan={7} className="h-24 text-center">
									No invoices found.
								</TableCell>
							</TableRow>
						) : (
							invoicesList.map((invoice) => (
								<TableRow key={invoice.id}>
									<TableCell className="font-medium">
                                        <Link href={`/invoices/${invoice.id}`} className="hover:underline">
                                            {invoice.invoiceNumber}
                                        </Link>
                                    </TableCell>
									<TableCell>{invoice.clientName}</TableCell>
									<TableCell>{formatDate(invoice.issueDate)}</TableCell>
									<TableCell>{formatDate(invoice.dueDate)}</TableCell>
									<TableCell>
										<Badge
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
									<TableCell className="text-right font-bold">{formatCurrency(invoice.totalAmount)}</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm" asChild>
                                            <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                                        </Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
