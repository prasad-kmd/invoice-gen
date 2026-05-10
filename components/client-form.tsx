"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient, updateClient } from "@/actions/clients";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const clientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().optional(),
	address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormProps {
	initialData?: any;
}

export function ClientForm({ initialData }: ClientFormProps) {
	const router = useRouter();
	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: initialData || {
			name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	async function onSubmit(values: ClientFormValues) {
		try {
			if (initialData) {
				await updateClient(initialData.id, values);
				toast.success("Client updated successfully");
			} else {
				await createClient(values);
				toast.success("Client created successfully");
			}
			router.push("/clients");
			router.refresh();
		} catch (error) {
			toast.error("Something went wrong");
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>{initialData ? "Edit Client" : "New Client"}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Name</label>
						<Input {...form.register("name")} placeholder="Client Name" />
						{form.formState.errors.name && (
							<p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Email</label>
						<Input {...form.register("email")} type="email" placeholder="client@example.com" />
						{form.formState.errors.email && (
							<p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Phone</label>
						<Input {...form.register("phone")} placeholder="+1 (555) 000-0000" />
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Address</label>
						<textarea
							{...form.register("address")}
							className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="Client Address"
						/>
					</div>
					<div className="flex justify-end gap-4">
						<Button type="button" variant="outline" onClick={() => router.back()}>
							Cancel
						</Button>
						<Button type="submit">
							{initialData ? "Update Client" : "Create Client"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
