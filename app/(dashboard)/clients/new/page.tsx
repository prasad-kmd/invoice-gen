import { ClientForm } from "@/components/client-form";

export default function NewClientPage() {
	return (
		<div className="mx-auto max-w-2xl space-y-8">
			<h1 className="text-3xl font-bold">Add New Client</h1>
			<ClientForm />
		</div>
	);
}
