import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { BentoCard, GlassCard, MicroBadge } from "@/components/ui/design-system";
import { ReceiptText, Users, CreditCard, AlertCircle, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
	const stats = await getDashboardStats();
	const recentInvoices = await getRecentInvoices();

	const statItems = [
		{
			label: "Total Invoices",
			value: stats.totalInvoices,
			icon: ReceiptText,
			color: "text-primary",
			bg: "bg-primary/10"
		},
		{
			label: "Amount Paid",
			value: formatCurrency(stats.amountPaid),
			icon: CreditCard,
			color: "text-green-500",
			bg: "bg-green-500/10"
		},
		{
			label: "Outstanding",
			value: formatCurrency(stats.outstanding),
			icon: TrendingUp,
			color: "text-blue-500",
			bg: "bg-blue-500/10"
		},
		{
			label: "Overdue",
			value: formatCurrency(stats.overdue),
			icon: AlertCircle,
			color: "text-destructive",
			bg: "bg-destructive/10"
		},
	];

	return (
		<div className="space-y-10">
			<div>
				<MicroBadge className="mb-2">Overview</MicroBadge>
				<h1 className="text-4xl font-black mozilla-headline tracking-tighter">Dashboard</h1>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{statItems.map((item) => (
					<BentoCard key={item.label} className="flex flex-col justify-between p-6 h-40">
						<div className="flex items-center justify-between">
							<span className="text-xs font-bold local-jetbrains-mono uppercase tracking-widest text-muted-foreground">
								{item.label}
							</span>
							<div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
								<item.icon size={18} />
							</div>
						</div>
						<div className="text-3xl font-black mozilla-headline tracking-tight">
							{item.value}
						</div>
					</BentoCard>
				))}
			</div>

			<GlassCard className="p-0 border-border/40 overflow-hidden">
				<div className="p-6 border-b border-border/40 flex items-center justify-between bg-card/50">
					<h2 className="text-xl font-bold mozilla-headline">Recent Invoices</h2>
					<Badge variant="outline" className="local-jetbrains-mono text-[10px] uppercase tracking-widest">
						Latest 5
					</Badge>
				</div>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-border/40">
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6">Invoice #</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6">Client</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6">Date</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6">Status</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentInvoices.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-40 text-center text-muted-foreground local-inter">
										No invoices found.
									</TableCell>
								</TableRow>
							) : (
								recentInvoices.map((invoice) => (
									<TableRow key={invoice.id} className="hover:bg-muted/50 transition-colors border-border/40">
										<TableCell className="px-6 py-4">
											<span className="font-bold local-jetbrains-mono text-primary">
												{invoice.invoiceNumber}
											</span>
										</TableCell>
										<TableCell className="px-6 py-4 font-medium local-inter">
											{invoice.clientName}
										</TableCell>
										<TableCell className="px-6 py-4 text-muted-foreground local-inter">
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
										<TableCell className="px-6 py-4 text-right font-bold mozilla-headline tracking-tight">
											{formatCurrency(invoice.totalAmount)}
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
