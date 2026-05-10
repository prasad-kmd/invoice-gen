import { getClients } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientsPage({ searchParams }: { searchParams: { q?: string } }) {
	const query = (await searchParams).q;
	const clientsList = await getClients(query);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Clients</h1>
				<Button asChild>
					<Link href="/clients/new">
						<Plus className="mr-2 h-4 w-4" />
						Add Client
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input name="q" placeholder="Search clients by name, email, or phone..." className="pl-10" defaultValue={query} />
					</form>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Address</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{clientsList.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="h-24 text-center">
									No clients found.
								</TableCell>
							</TableRow>
						) : (
							clientsList.map((client) => (
								<TableRow key={client.id}>
									<TableCell className="font-medium">
										<Link href={`/clients/${client.id}`} className="hover:underline">
											{client.name}
										</Link>
									</TableCell>
									<TableCell>{client.email || "-"}</TableCell>
									<TableCell>{client.phone || "-"}</TableCell>
									<TableCell className="max-w-xs truncate">{client.address || "-"}</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
