"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/actions/clients";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

const clientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email().optional().or(z.literal("")),
	phone: z.string().optional(),
	address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface AddClientDialogProps {
	onClientAdded: (client: any) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddClientDialog({ onClientAdded, open, onOpenChange }: AddClientDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	async function onSubmit(values: ClientFormValues) {
		setIsSubmitting(true);
		try {
			const newClient = await createClient(values);
			toast.success("Client added successfully");
			onClientAdded(newClient);
			onOpenChange(false);
			form.reset();
		} catch (error) {
			toast.error("Failed to add client");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add New Client</DialogTitle>
					<DialogDescription>
						Enter the details of the new client here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Full Name</Label>
						<Input id="name" {...form.register("name")} placeholder="John Doe" />
						{form.formState.errors.name && (
                            <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                        )}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email Address</Label>
						<Input id="email" type="email" {...form.register("email")} placeholder="john@example.com" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input id="phone" {...form.register("phone")} placeholder="+1 (555) 000-0000" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="address">Address</Label>
						<Input id="address" {...form.register("address")} placeholder="123 Street, City, Country" />
					</div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}
                            Save Client
                        </Button>
                    </DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
