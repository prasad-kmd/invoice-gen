"use server";

import { db } from "@/lib/db";
import { clients, invoices } from "@/db/schema";
import { eq, desc, ilike, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const clientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().optional(),
	address: z.string().optional(),
});

export async function getClients(search?: string) {
	if (search) {
		return await db
			.select()
			.from(clients)
			.where(or(ilike(clients.name, `%${search}%`), ilike(clients.email, `%${search}%`), ilike(clients.phone, `%${search}%`)))
			.orderBy(desc(clients.createdAt));
	}
	return await db.select().from(clients).orderBy(desc(clients.createdAt));
}

export async function getClientById(id: string) {
	const [client] = await db.select().from(clients).where(eq(clients.id, id));
	if (!client) return null;

	const clientInvoices = await db
		.select()
		.from(invoices)
		.where(eq(invoices.clientId, id))
		.orderBy(desc(invoices.createdAt));

	return {
		...client,
		invoices: clientInvoices,
	};
}

export async function createClient(data: z.infer<typeof clientSchema>) {
	const validatedData = clientSchema.parse(data);
	const id = crypto.randomUUID();

	await db.insert(clients).values({
		id,
		...validatedData,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	revalidatePath("/clients");
	return { id };
}

export async function updateClient(id: string, data: z.infer<typeof clientSchema>) {
	const validatedData = clientSchema.parse(data);

	await db
		.update(clients)
		.set({
			...validatedData,
			updatedAt: new Date(),
		})
		.where(eq(clients.id, id));

	revalidatePath("/clients");
	revalidatePath(`/clients/${id}`);
}

export async function deleteClient(id: string) {
	await db.delete(clients).where(eq(clients.id, id));
	revalidatePath("/clients");
}
