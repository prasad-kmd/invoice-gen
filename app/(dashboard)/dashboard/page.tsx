import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const stats = await getDashboardStats();
	const recentInvoices = await getRecentInvoices();

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats.totalInvoices}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(stats.amountPaid)}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Outstanding</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(stats.outstanding)}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Overdue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(stats.overdue)}</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Invoices</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice #</TableHead>
								<TableHead>Client</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentInvoices.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-24 text-center">
										No invoices found.
									</TableCell>
								</TableRow>
							) : (
								recentInvoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
										<TableCell>{invoice.clientName}</TableCell>
										<TableCell>{formatDate(invoice.issueDate)}</TableCell>
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
										<TableCell className="text-right">{formatCurrency(invoice.totalAmount)}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
