import { InvoiceForm } from "@/components/invoice/invoice-form";
import { getClients } from "@/actions/clients";
import { db } from "@/lib/db";
import { businessSettings, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage() {
	const clientsList = await getClients();
	
	const [adminUser] = await db.select().from(user).where(eq(user.role, "admin")).limit(1);
	
	if (!adminUser) {
		redirect("/login");
	}

	const [business] = await db.select().from(businessSettings).where(eq(businessSettings.userId, adminUser.id));

	if (!business) {
		redirect("/settings");
	}

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Create New Invoice</h1>
			<InvoiceForm userId={adminUser.id} clients={clientsList} business={business} />
		</div>
	);
}
