"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UserPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface QuickAddClientProps {
  onClientAdded: (client: any) => void;
}

export function QuickAddClient({ onClientAdded }: QuickAddClientProps) {
  const [open, setOpen] = useState(false);
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
    try {
      setIsSubmitting(true);
      const newClient = await createClient(values);
      toast.success("Client added successfully");
      onClientAdded(newClient);
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to add client");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button" className="h-9 px-2">
          <Plus className="h-4 w-4 mr-1" /> New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add New Client
          </DialogTitle>
          <DialogDescription>
            Enter the client's details below to create a new record.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Full Name</label>
            <Input {...form.register("name")} placeholder="John Doe" className="bg-muted/30" />
            {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Email Address</label>
            <Input {...form.register("email")} type="email" placeholder="john@example.com" className="bg-muted/30" />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Phone Number</label>
            <Input {...form.register("phone")} placeholder="+94 77 123 4567" className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Address</label>
            <Input {...form.register("address")} placeholder="123 Street, City" className="bg-muted/30" />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
