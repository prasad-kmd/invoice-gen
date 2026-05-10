import { getInvoices } from "@/actions/invoices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, ReceiptText, MoreVertical, FileText, Edit, Calendar } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<{ q?: string, status?: string }> }) {
  const params = await searchParams;
  const invoicesList = await getInvoices({
    q: params.q,
    status: params.status,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Manage and track your repair billing records.</p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/invoices/new">
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Card className="w-full shadow-sm border-muted">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <form>
                <Input
                  name="q"
                  placeholder="Search by invoice # or client name..."
                  className="pl-10 h-11 bg-muted/50 border-none focus-visible:ring-primary"
                  defaultValue={params.q}
                />
              </form>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="h-11 px-4 shrink-0">
                    <Filter className="mr-2 h-4 w-4" />
                    Status
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[120px] font-semibold">Invoice #</TableHead>
              <TableHead className="font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Dates</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoicesList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-48 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                        <ReceiptText className="h-12 w-12 mb-4 opacity-10" />
                        <p className="text-lg font-medium">No invoices found</p>
                    </div>
                </TableCell>
              </TableRow>
            ) : (
              invoicesList.map((invoice) => (
                <TableRow key={invoice.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <Link href={`/invoices/${invoice.id}`} className="font-mono text-sm font-semibold hover:text-primary transition-colors">
                      {invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{invoice.clientName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs gap-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <span className="font-medium text-[10px] uppercase bg-muted px-1 rounded">Issued</span> {formatDate(invoice.issueDate)}
                      </span>
                      {invoice.dueDate && (
                        <span className="text-muted-foreground flex items-center gap-1">
                            <span className="font-medium text-[10px] uppercase bg-muted px-1 rounded">Due</span> {formatDate(invoice.dueDate)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right font-bold text-base">
                    {formatCurrency(invoice.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/invoices/${invoice.id}`} title="View Details">
                                <FileText className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/invoices/${invoice.id}/edit`} title="Edit Invoice">
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="grid gap-4 lg:hidden">
        {invoicesList.length === 0 ? (
          <Card className="border-dashed shadow-none bg-transparent">
            <CardContent className="p-8 text-center text-muted-foreground">
              <ReceiptText className="h-12 w-12 mx-auto mb-4 opacity-10" />
              <p>No invoices found</p>
            </CardContent>
          </Card>
        ) : (
          invoicesList.map((invoice) => (
            <Card key={invoice.id} className="shadow-sm overflow-hidden border-l-4 border-l-primary/40">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-primary">{invoice.invoiceNumber}</span>
                        <StatusBadge status={invoice.status} />
                    </div>
                    <h3 className="font-bold text-lg">{invoice.clientName}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/invoices/${invoice.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/invoices/${invoice.id}/edit`}>Edit Invoice</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Issue Date</p>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {formatDate(invoice.issueDate)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total Amount</p>
                        <p className="text-lg font-bold">{formatCurrency(invoice.totalAmount)}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" asChild className="flex-1">
                    <Link href={`/invoices/${invoice.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
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

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "paid":
            return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 capitalize font-medium">Paid</Badge>;
        case "overdue":
            return <Badge variant="destructive" className="capitalize font-medium shadow-none">Overdue</Badge>;
        case "sent":
            return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 capitalize font-medium">Sent</Badge>;
        default:
            return <Badge variant="secondary" className="capitalize font-medium">{status}</Badge>;
    }
}
