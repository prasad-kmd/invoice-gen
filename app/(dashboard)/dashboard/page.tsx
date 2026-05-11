import { getDashboardStats, getRecentInvoices } from "@/actions/dashboard";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ReceiptText,
  Users,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

import { getSettings } from "@/actions/settings";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const settings = await getSettings(session?.user.id!);
  const currency = settings?.currency || "LKR";

  const stats = await getDashboardStats();
  const recentInvoices = await getRecentInvoices();

  const statCards = [
    {
      title: "Total Invoices",
      value: stats.totalInvoices,
      icon: ReceiptText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Amount Paid",
      value: formatCurrency(stats.amountPaid, currency),
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Outstanding",
      value: formatCurrency(stats.outstanding, currency),
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Overdue",
      value: formatCurrency(stats.overdue, currency),
      icon: AlertCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-6 py-4 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black mozilla-headline tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground google-sans">
          Overview of your repair business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={stat.title}
            className="group relative p-4 rounded-xl border border-border/40 bg-card/80 backdrop-blur-3xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground/30" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                {stat.title}
              </p>
              <p className="text-3xl font-bold mozilla-headline tracking-tighter">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative rounded-2xl border border-border/40 bg-card/80 backdrop-blur-3xl shadow-xl overflow-hidden min-h-[400px]">
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <h2 className="text-xl font-bold mozilla-headline tracking-tight flex items-center gap-2">
              <ReceiptText className="h-6 w-6 text-primary" />
              Recent Invoices
            </h2>
            <Link
              href="/invoices"
              className="group flex items-center text-sm font-bold text-primary hover:opacity-80 transition-opacity google-sans uppercase tracking-widest"
            >
              View All
              <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                    Invoice #
                  </th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
                    Client
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-32 text-center text-muted-foreground google-sans">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  recentInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="group/row hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-8 py-4 font-bold local-jetbrains-mono text-sm">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-8 py-4 google-sans text-sm font-medium">
                        {invoice.clientName}
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
