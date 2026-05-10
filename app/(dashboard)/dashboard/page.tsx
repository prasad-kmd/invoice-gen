import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ReceiptText, CheckCircle2, AlertCircle, Clock, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentInvoices = await getRecentInvoices();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Monitor your business performance and recent activity.</p>
        </div>
        <Button asChild className="shrink-0 bg-primary hover:bg-primary/90 shadow-sm">
          <Link href="/invoices/new">
            <Plus className="mr-2 h-4 w-4" /> New Invoice
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoices"
          value={stats.totalInvoices.toString()}
          icon={<ReceiptText className="h-4 w-4 text-primary" />}
          description="Total generated invoices"
        />
        <StatCard
          title="Amount Paid"
          value={formatCurrency(stats.amountPaid)}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          description="Successfully collected"
        />
        <StatCard
          title="Outstanding"
          value={formatCurrency(stats.outstanding)}
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          description="Awaiting payment"
        />
        <StatCard
          title="Overdue"
          value={formatCurrency(stats.overdue)}
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
          description="Past due date"
        />
      </div>

      <Card className="shadow-sm border-muted overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>The last 5 invoices you've created.</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-primary">
            <Link href="/invoices" className="flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
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
                            <ReceiptText className="h-8 w-8 mb-2 opacity-20" />
                            <p>No invoices found.</p>
                        </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="group cursor-pointer hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell className="font-medium">{invoice.clientName}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {formatDate(invoice.issueDate)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(invoice.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 md:hidden border-t">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/invoices">View all invoices</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description: string }) {
  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-muted rounded-md">
            {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "paid":
            return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 capitalize">Paid</Badge>;
        case "overdue":
            return <Badge variant="destructive" className="capitalize">Overdue</Badge>;
        case "sent":
            return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 capitalize">Sent</Badge>;
        default:
            return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
}
