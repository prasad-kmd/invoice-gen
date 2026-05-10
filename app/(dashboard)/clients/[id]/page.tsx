import { getClientById } from "@/actions/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
    const id = (await params).id;
	const client = await getClientById(id);

	if (!client) {
		notFound();
	}

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">{client.name}</h1>
					<p className="text-muted-foreground">{client.email || "No email provided"}</p>
				</div>
				<Button variant="outline" asChild>
					<Link href={`/clients/${client.id}/edit`}>Edit Client</Link>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div>
							<span className="font-semibold">Phone:</span> {client.phone || "N/A"}
						</div>
						<div>
							<span className="font-semibold">Address:</span>
							<p className="whitespace-pre-line">{client.address || "N/A"}</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Summary</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div>
							<span className="font-semibold">Total Invoices:</span> {client.invoices.length}
						</div>
						<div>
							<span className="font-semibold">Total Spent:</span>{" "}
							{formatCurrency(client.invoices.reduce((sum, inv) => sum + inv.totalAmount, 0))}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Invoice History</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice #</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{client.invoices.length === 0 ? (
								<TableRow>
									<TableCell colSpan={4} className="h-24 text-center">
										No invoices found for this client.
									</TableCell>
								</TableRow>
							) : (
								client.invoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell className="font-medium">
											<Link href={`/invoices/${invoice.id}`} className="hover:underline">
												{invoice.invoiceNumber}
											</Link>
										</TableCell>
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
