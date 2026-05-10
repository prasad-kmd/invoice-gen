"use server";

import { db } from "@/lib/db";
import { invoices, clients, invoiceItems, businessSettings } from "@/db/schema";
import { eq, desc, ilike, or, and, gte, lte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const invoiceItemSchema = z.object({
	id: z.string().optional(),
	description: z.string().min(1, "Description is required"),
	quantity: z.number().min(0.01, "Quantity must be at least 0.01"),
	unitPrice: z.number().min(0, "Price cannot be negative"),
});

const invoiceSchema = z.object({
	clientId: z.string().min(1, "Client is required"),
	issueDate: z.date(),
	dueDate: z.date(),
	status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]),
	taxRate: z.number().min(0),
	discountAmount: z.number().min(0),
	customNotes: z.string().optional(),
	paymentTerms: z.string().optional(),
	items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

export async function getInvoices(filters?: {
	q?: string;
	status?: string;
	startDate?: Date;
	endDate?: Date;
}) {
	let query = db
		.select({
			id: invoices.id,
			invoiceNumber: invoices.invoiceNumber,
			issueDate: invoices.issueDate,
			dueDate: invoices.dueDate,
			status: invoices.status,
			totalAmount: invoices.totalAmount,
			clientName: clients.name,
		})
		.from(invoices)
		.leftJoin(clients, eq(invoices.clientId, clients.id));

	const conditions = [];

	if (filters?.q) {
		conditions.push(
			or(
				ilike(invoices.invoiceNumber, `%${filters.q}%`),
				ilike(clients.name, `%${filters.q}%`),
				ilike(clients.phone, `%${filters.q}%`),
			),
		);
	}

	if (filters?.status && filters.status !== "all") {
		conditions.push(eq(invoices.status, filters.status as any));
	}

	if (filters?.startDate) {
		conditions.push(gte(invoices.issueDate, filters.startDate));
	}

	if (filters?.endDate) {
		conditions.push(lte(invoices.issueDate, filters.endDate));
	}

	if (conditions.length > 0) {
		// @ts-ignore
		query = query.where(and(...conditions));
	}

	return await query.orderBy(desc(invoices.createdAt));
}

export async function getInvoiceById(id: string) {
	const [invoice] = await db
		.select()
		.from(invoices)
		.where(eq(invoices.id, id));
	
	if (!invoice) return null;

	const items = await db
		.select()
		.from(invoiceItems)
		.where(eq(invoiceItems.invoiceId, id))
		.orderBy(invoiceItems.sortOrder);

	const [client] = await db
		.select()
		.from(clients)
		.where(eq(clients.id, invoice.clientId));

	return {
		...invoice,
		items,
		client,
	};
}

export async function createInvoice(userId: string, data: any) {
	const validatedData = invoiceSchema.parse(data);
	
	const [settings] = await db
		.select()
		.from(businessSettings)
		.where(eq(businessSettings.userId, userId));

	if (!settings) throw new Error("Business settings not found.");

	const invoiceId = crypto.randomUUID();
	const invoiceNumber = `${settings.invoicePrefix}${String(settings.nextInvoiceNumber).padStart(settings.invoicePadding, "0")}`;

	let subtotal = 0;
	const itemsToInsert = validatedData.items.map((item, index) => {
		const total = item.quantity * item.unitPrice;
		subtotal += total;
		return {
			id: crypto.randomUUID(),
			invoiceId,
			description: item.description,
			quantity: item.quantity,
			unitPrice: item.unitPrice,
			totalPrice: total,
			sortOrder: index,
		};
	});

	const taxAmount = (subtotal * validatedData.taxRate) / 100;
	const totalAmount = subtotal + taxAmount - validatedData.discountAmount;

	await db.transaction(async (tx) => {
		await tx.insert(invoices).values({
			id: invoiceId,
			invoiceNumber,
			clientId: validatedData.clientId,
			userId,
			issueDate: validatedData.issueDate,
			dueDate: validatedData.dueDate,
			status: validatedData.status,
			subtotal,
			taxRate: validatedData.taxRate,
			taxAmount,
			discountAmount: validatedData.discountAmount,
			totalAmount,
			customNotes: validatedData.customNotes,
			paymentTerms: validatedData.paymentTerms || settings.defaultPaymentTerms,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await tx.insert(invoiceItems).values(itemsToInsert);

		await tx
			.update(businessSettings)
			.set({ nextInvoiceNumber: settings.nextInvoiceNumber + 1 })
			.where(eq(businessSettings.id, settings.id));
	});

	revalidatePath("/invoices");
	revalidatePath("/dashboard");
	return { id: invoiceId };
}

export async function updateInvoice(id: string, data: any) {
    const validatedData = invoiceSchema.parse(data);

    let subtotal = 0;
    const itemsToProcess = validatedData.items.map((item, index) => {
        const total = item.quantity * item.unitPrice;
        subtotal += total;
        return {
            id: item.id || crypto.randomUUID(),
            invoiceId: id,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: total,
            sortOrder: index,
        };
    });

    const taxAmount = (subtotal * validatedData.taxRate) / 100;
    const totalAmount = subtotal + taxAmount - validatedData.discountAmount;

    await db.transaction(async (tx) => {
        await tx.update(invoices).set({
            clientId: validatedData.clientId,
            issueDate: validatedData.issueDate,
            dueDate: validatedData.dueDate,
            status: validatedData.status,
            subtotal,
            taxRate: validatedData.taxRate,
            taxAmount,
            discountAmount: validatedData.discountAmount,
            totalAmount,
            customNotes: validatedData.customNotes,
            paymentTerms: validatedData.paymentTerms,
            updatedAt: new Date(),
        }).where(eq(invoices.id, id));

        await tx.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
        await tx.insert(invoiceItems).values(itemsToProcess);
    });

    revalidatePath("/invoices");
    revalidatePath(`/invoices/${id}`);
    revalidatePath("/dashboard");
}

export async function deleteInvoice(id: string) {
	await db.delete(invoices).where(eq(invoices.id, id));
	revalidatePath("/invoices");
	revalidatePath("/dashboard");
}

export async function updateInvoiceStatus(id: string, status: "draft" | "sent" | "paid" | "overdue" | "cancelled") {
	await db.update(invoices).set({ status, updatedAt: new Date() }).where(eq(invoices.id, id));
	revalidatePath("/invoices");
	revalidatePath(`/invoices/${id}`);
	revalidatePath("/dashboard");
}
