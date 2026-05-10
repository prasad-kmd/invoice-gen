import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import {
    ReceiptText,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Plus,
    Users,
    FileText
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/actions/settings";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const sessionResponse = await authClient.getSession({
        fetchOptions: {
            headers: await headers()
        }
    });

    const session = sessionResponse?.data;
    const settings = session?.user ? await getSettings(session.user.id) : null;
    const currency = settings?.currency || "LKR";

	const stats = await getDashboardStats();
	const recentInvoices = await getRecentInvoices();

	const statCards = [
		{
			title: "Total Invoices",
			value: stats.totalInvoices,
			description: "Lifetime invoices",
			icon: ReceiptText,
			color: "text-blue-500",
			bgColor: "bg-blue-500/10",
		},
		{
			title: "Amount Paid",
			value: formatCurrency(stats.amountPaid, currency),
			description: "Successfully received",
			icon: CheckCircle2,
			color: "text-emerald-500",
			bgColor: "bg-emerald-500/10",
		},
		{
			title: "Outstanding",
			value: formatCurrency(stats.outstanding, currency),
			description: "Awaiting payment",
			icon: Clock,
			color: "text-amber-500",
			bgColor: "bg-amber-500/10",
		},
		{
			title: "Overdue",
			value: formatCurrency(stats.overdue, currency),
			description: "Past due date",
			icon: AlertCircle,
			color: "text-rose-500",
			bgColor: "bg-rose-500/10",
		},
	];

	return (
		<div className="space-y-8 pb-10">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold font-google-sans">Overview</h1>
					<p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
				</div>
				<div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/clients/new">
                            <Users className="mr-2 h-4 w-4" />
                            Add Client
                        </Link>
                    </Button>
					<Button asChild>
						<Link href="/invoices/new">
							<Plus className="mr-2 h-4 w-4" />
							New Invoice
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{statCards.map((stat, i) => (
					<Card key={i} className="overflow-hidden border-none shadow-md bg-background/60 backdrop-blur-sm">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
							<div className={cn("p-2 rounded-lg", stat.bgColor)}>
								<stat.icon className={cn("h-4 w-4", stat.color)} />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold font-google-sans">{stat.value}</div>
							<p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="border-none shadow-md bg-background/60 backdrop-blur-sm">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle className="font-google-sans">Recent Invoices</CardTitle>
						<CardDescription>A list of the latest invoices created.</CardDescription>
					</div>
					<Button variant="ghost" size="sm" asChild className="hidden sm:flex">
						<Link href="/invoices" className="flex items-center gap-1">
							View All
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</Button>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead className="w-[100px]">Invoice #</TableHead>
									<TableHead>Client</TableHead>
									<TableHead className="hidden md:table-cell">Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentInvoices.length === 0 ? (
									<TableRow>
										<TableCell colSpan={5} className="h-32 text-center">
											<div className="flex flex-col items-center justify-center text-muted-foreground">
												<FileText className="h-8 w-8 mb-2 opacity-20" />
												<p>No invoices found yet.</p>
												<Link href="/invoices/new" className="text-primary hover:underline text-sm mt-1">
													Create your first invoice
												</Link>
											</div>
										</TableCell>
									</TableRow>
								) : (
									recentInvoices.map((invoice) => (
										<TableRow key={invoice.id} className="group cursor-pointer">
											<TableCell className="font-medium">
                                                <Link href={`/invoices/${invoice.id}`} className="hover:text-primary transition-colors">
                                                    {invoice.invoiceNumber}
                                                </Link>
                                            </TableCell>
											<TableCell className="font-medium">{invoice.clientName}</TableCell>
											<TableCell className="hidden md:table-cell text-muted-foreground">
                                                {formatDate(invoice.issueDate)}
                                            </TableCell>
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
											<TableCell className="text-right font-bold">
                                                {formatCurrency(invoice.totalAmount, (invoice as any).currency || currency)}
                                            </TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
                    <div className="mt-4 sm:hidden">
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/invoices">View All Invoices</Link>
                        </Button>
                    </div>
				</CardContent>
			</Card>
		</div>
	);
}
