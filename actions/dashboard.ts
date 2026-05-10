"use server";

import { db } from "@/lib/db";
import { invoices, clients } from "@/db/schema";
import { desc, eq, sql, and, or } from "drizzle-orm";

export async function getDashboardStats() {
	const stats = await db
		.select({
			totalInvoices: sql<number>`count(*)`,
			amountPaid: sql<number>`sum(case when ${invoices.status} = 'paid' then ${invoices.totalAmount} else 0 end)`,
			outstanding: sql<number>`sum(case when ${invoices.status} in ('sent', 'overdue') then ${invoices.totalAmount} else 0 end)`,
			overdue: sql<number>`sum(case when ${invoices.status} = 'overdue' then ${invoices.totalAmount} else 0 end)`,
		})
		.from(invoices);

	return {
		totalInvoices: Number(stats[0]?.totalInvoices || 0),
		amountPaid: Number(stats[0]?.amountPaid || 0),
		outstanding: Number(stats[0]?.outstanding || 0),
		overdue: Number(stats[0]?.overdue || 0),
	};
}

export async function getRecentInvoices(limit = 5) {
	return await db
		.select({
			id: invoices.id,
			invoiceNumber: invoices.invoiceNumber,
			issueDate: invoices.issueDate,
			status: invoices.status,
			totalAmount: invoices.totalAmount,
			clientName: clients.name,
		})
		.from(invoices)
		.leftJoin(clients, eq(invoices.clientId, clients.id))
		.orderBy(desc(invoices.createdAt))
		.limit(limit);
}
