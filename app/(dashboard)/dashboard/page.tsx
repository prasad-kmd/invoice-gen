import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { ReceiptText, CheckCircle2, AlertCircle, Clock, ArrowUpRight, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSettings } from "@/actions/settings";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentInvoices = await getRecentInvoices();

  // Get currency from settings
  const [adminUser] = await db.select().from(user).where(eq(user.role, "admin")).limit(1);
  const settings = adminUser ? await getSettings(adminUser.id) : null;
  const currency = settings?.currency || "LKR";

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Overview</h1>
          <p className="text-muted-foreground font-medium">System performance and billing telemetry.</p>
        </div>
        <Button asChild className="rounded-full h-12 px-6 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
          <Link href="/invoices/new">
            <Plus className="mr-2 h-5 w-5" /> Create New Invoice
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Volume"
          value={stats.totalInvoices.toString()}
          icon={<ReceiptText className="h-5 w-5" />}
          description="Total records in system"
          trend="+12%"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.amountPaid, currency)}
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Settled successfully"
          trend="+5.4%"
          color="emerald"
        />
        <StatCard
          title="Pending"
          value={formatCurrency(stats.outstanding, currency)}
          icon={<Clock className="h-5 w-5" />}
          description="Awaiting settlement"
          color="amber"
        />
        <StatCard
          title="Overdue"
          value={formatCurrency(stats.overdue, currency)}
          icon={<AlertCircle className="h-5 w-5" />}
          description="Action required"
          color="destructive"
        />
      </div>

      <Card className="rounded-[2rem] border shadow-2xl shadow-black/5 overflow-hidden bg-card/50 backdrop-blur">
        <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between border-b border-border/50">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Recent Activity
            </CardTitle>
            <CardDescription className="font-medium">The latest telemetry from your billing stream.</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full px-6 border-primary/20 hover:bg-primary/5 transition-all hidden sm:flex">
            <Link href="/invoices">View Log</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30 border-none">
                  <TableHead className="w-[150px] font-bold text-xs uppercase tracking-widest pl-8 py-5">Record ID</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Subject</TableHead>
                  <TableHead className="hidden md:table-cell font-bold text-xs uppercase tracking-widest py-5 text-center">Status</TableHead>
                  <TableHead className="text-right font-bold text-xs uppercase tracking-widest pr-8 py-5">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-48 text-center text-muted-foreground font-medium">
                        NO ACTIVE RECORDS FOUND
                    </TableCell>
                  </TableRow>
                ) : (
                  recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="group border-b border-border/50 hover:bg-muted/20 transition-all duration-300">
                      <TableCell className="font-mono text-sm font-bold pl-8 py-6 text-primary">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{invoice.clientName}</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">{formatDate(invoice.issueDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="text-right font-black text-xl pr-8 tracking-tighter">
                        {formatCurrency(invoice.totalAmount, currency)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, description, trend, color = "primary" }: { title: string, value: string, icon: React.ReactNode, description: string, trend?: string, color?: string }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-500/10 text-emerald-500",
    amber: "bg-amber-500/10 text-amber-500",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="rounded-3xl border shadow-xl shadow-black/5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 p-2 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-3 rounded-2xl transition-transform duration-500 group-hover:rotate-12", colorMap[color])}>
            {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black tracking-tighter">{value}</div>
        <div className="flex items-center gap-2 mt-2">
            {trend && (
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", colorMap[color])}>
                    {trend}
                </span>
            )}
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "paid":
            return <Badge variant="outline" className="rounded-full px-4 py-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 capitalize font-bold text-[10px] tracking-widest">PAID</Badge>;
        case "overdue":
            return <Badge variant="destructive" className="rounded-full px-4 py-1 capitalize font-bold text-[10px] tracking-widest shadow-lg shadow-destructive/20">OVERDUE</Badge>;
        case "sent":
            return <Badge variant="outline" className="rounded-full px-4 py-1 bg-amber-500/10 text-amber-500 border-amber-500/20 capitalize font-bold text-[10px] tracking-widest">SENT</Badge>;
        default:
            return <Badge variant="secondary" className="rounded-full px-4 py-1 capitalize font-bold text-[10px] tracking-widest uppercase">{status}</Badge>;
    }
}
