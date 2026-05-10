import { getInvoices } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, FileText, ExternalLink, Calendar, User } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceStatusFilter } from "@/components/invoice-status-filter";
import { Suspense } from "react";
import { getSettings } from "@/actions/settings";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }: { searchParams: { q?: string, status?: string } }) {
    const params = await searchParams;
    const sessionResponse = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    });

    const session = sessionResponse?.data;
    const settings = session?.user ? await getSettings(session.user.id) : null;
    const defaultCurrency = settings?.currency || "LKR";

	const invoicesList = await getInvoices({
		q: params.q,
		status: params.status,
	});

	return (
		<div className="space-y-8 pb-10">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold font-google-sans">Invoices</h1>
					<p className="text-muted-foreground">Manage and track your billing and payments.</p>
				</div>
				<Button asChild className="w-full md:w-auto">
					<Link href="/invoices/new">
						<Plus className="mr-2 h-4 w-4" />
						Create New Invoice
					</Link>
				</Button>
			</div>

			<div className="flex flex-col sm:flex-row items-center gap-4">
				<div className="relative flex-1 w-full sm:max-w-md">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input
                            name="q"
                            placeholder="Search by invoice #, client..."
                            className="pl-10 bg-background"
                            defaultValue={params.q}
                        />
					</form>
				</div>
                <div className="w-full sm:w-auto flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden lg:inline">Filter by:</span>
                    <Suspense fallback={<div className="h-10 w-[150px] bg-muted animate-pulse rounded-md" />}>
                        <InvoiceStatusFilter />
                    </Suspense>
                </div>
			</div>

			{/* Desktop View: Table */}
			<div className="hidden md:block rounded-xl border-none shadow-md bg-background overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted/50 hover:bg-muted/50">
							<TableHead className="font-bold">Invoice #</TableHead>
							<TableHead className="font-bold">Client</TableHead>
							<TableHead className="font-bold">Issue Date</TableHead>
							<TableHead className="font-bold">Status</TableHead>
							<TableHead className="text-right font-bold">Total</TableHead>
							<TableHead className="text-right font-bold">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoicesList.length === 0 ? (
							<TableRow>
								<TableCell colSpan={6} className="h-48 text-center">
									<div className="flex flex-col items-center justify-center text-muted-foreground">
										<FileText className="h-10 w-10 mb-2 opacity-20" />
										<p className="text-lg font-medium">No invoices found</p>
										<p className="text-sm">Try a different search or filter.</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							invoicesList.map((invoice) => (
								<TableRow key={invoice.id} className="group transition-colors hover:bg-muted/30">
									<TableCell>
										<Link href={`/invoices/${invoice.id}`} className="font-bold hover:text-primary transition-colors">
											{invoice.invoiceNumber}
										</Link>
									</TableCell>
									<TableCell className="font-medium text-foreground">{invoice.clientName}</TableCell>
									<TableCell className="text-muted-foreground">{formatDate(invoice.issueDate)}</TableCell>
									<TableCell>
										<Badge
                                            className="capitalize px-2 py-0.5"
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
									<TableCell className="text-right font-bold">{formatCurrency(invoice.totalAmount, (invoice as any).currency || defaultCurrency)}</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm" asChild>
                                            <Link href={`/invoices/${invoice.id}/edit`}>
                                                Edit
                                                <ExternalLink className="ml-1 h-3.5 w-3.5" />
                                            </Link>
                                        </Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Mobile View: Cards */}
			<div className="grid gap-4 md:hidden">
				{invoicesList.length === 0 ? (
					<div className="bg-background rounded-xl p-8 border text-center text-muted-foreground">
						<FileText className="h-10 w-10 mx-auto mb-2 opacity-20" />
						<p>No invoices found.</p>
					</div>
				) : (
					invoicesList.map((invoice) => (
						<Card key={invoice.id} className="overflow-hidden border-none shadow-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-3">
									<Link href={`/invoices/${invoice.id}`} className="font-bold text-lg hover:text-primary transition-colors">
										{invoice.invoiceNumber}
									</Link>
									<Badge
                                        className="capitalize"
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
								</div>
								<div className="space-y-2 mb-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
										<User className="h-4 w-4" />
										{invoice.clientName}
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Calendar className="h-4 w-4" />
										Issued: {formatDate(invoice.issueDate)}
									</div>
								</div>
								<div className="flex items-center justify-between pt-4 border-t">
                                    <div className="text-lg font-bold">{formatCurrency(invoice.totalAmount, (invoice as any).currency || defaultCurrency)}</div>
									<Button variant="outline" size="sm" asChild>
										<Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
