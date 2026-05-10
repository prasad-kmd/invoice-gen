import { getClientById } from "@/actions/clients";
import { ClientForm } from "@/components/client-form";
import { notFound } from "next/navigation";

export default async function EditClientPage({ params }: { params: { id: string } }) {
    const id = (await params).id;
	const client = await getClientById(id);

	if (!client) {
		notFound();
	}

	return (
		<div className="mx-auto max-w-2xl space-y-8">
			<h1 className="text-3xl font-bold">Edit Client</h1>
			<ClientForm initialData={client} />
		</div>
	);
}
