"use server";

import { db } from "@/lib/db";
import { businessSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
	businessName: z.string().min(1, "Business name is required"),
	address: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().email().optional().or(z.literal("")),
	website: z.string().url().optional().or(z.literal("")),
	logoUrl: z.string().url().optional().or(z.literal("")),
	defaultPaymentTerms: z.string().optional(),
	defaultTaxRate: z.number().min(0),
	invoicePrefix: z.string().min(1),
	invoicePadding: z.number().min(1),
	currency: z.string().min(3).max(3),
});

export async function getSettings(userId: string) {
	const [settings] = await db.select().from(businessSettings).where(eq(businessSettings.userId, userId));
	return settings;
}

export async function updateSettings(userId: string, data: z.infer<typeof settingsSchema>) {
	const validatedData = settingsSchema.parse(data);

	const [existing] = await db.select().from(businessSettings).where(eq(businessSettings.userId, userId));

	if (existing) {
		await db
			.update(businessSettings)
			.set({
				...validatedData,
			})
			.where(eq(businessSettings.userId, userId));
	} else {
		await db.insert(businessSettings).values({
			id: crypto.randomUUID(),
			userId,
			...validatedData,
		});
	}

	revalidatePath("/settings");
	revalidatePath("/invoices");
}
