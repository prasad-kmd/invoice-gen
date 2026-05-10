import { getInvoiceById } from "@/actions/invoices";
import { getClients } from "@/actions/clients";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { businessSettings, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { InvoiceForm } from "@/components/invoice/invoice-form";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
    const id = (await params).id;
	const invoice = await getInvoiceById(id);

	if (!invoice) {
		notFound();
	}

	const clientsList = await getClients();
	const [adminUser] = await db.select().from(user).where(eq(user.role, "admin")).limit(1);

	if (!adminUser) {
		redirect("/login");
	}

	const [business] = await db.select().from(businessSettings).where(eq(businessSettings.userId, adminUser.id));

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Edit Invoice {invoice.invoiceNumber}</h1>
			<InvoiceForm userId={adminUser.id} clients={clientsList} business={business} initialData={invoice} />
		</div>
	);
}
