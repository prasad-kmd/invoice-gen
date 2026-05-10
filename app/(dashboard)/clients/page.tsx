import { getClients } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, User, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientsPage({ searchParams }: { searchParams: { q?: string } }) {
	const query = (await searchParams).q;
	const clientsList = await getClients(query);

	return (
		<div className="space-y-8 pb-10">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold font-google-sans">Clients</h1>
					<p className="text-muted-foreground">Manage your client relationships and contact details.</p>
				</div>
				<Button asChild className="w-full md:w-auto">
					<Link href="/clients/new">
						<Plus className="mr-2 h-4 w-4" />
						Add New Client
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input
                            name="q"
                            placeholder="Search by name, email..."
                            className="pl-10 bg-background"
                            defaultValue={query}
                        />
					</form>
				</div>
			</div>

			{/* Desktop View: Table */}
			<div className="hidden md:block rounded-xl border-none shadow-md bg-background overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="bg-muted/50 hover:bg-muted/50">
							<TableHead className="font-bold">Client</TableHead>
							<TableHead className="font-bold">Contact Info</TableHead>
							<TableHead className="font-bold">Address</TableHead>
							<TableHead className="text-right font-bold">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{clientsList.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-48 text-center">
									<div className="flex flex-col items-center justify-center text-muted-foreground">
										<User className="h-10 w-10 mb-2 opacity-20" />
										<p className="text-lg font-medium">No clients found</p>
										<p className="text-sm">Try a different search term or add a new client.</p>
									</div>
								</TableCell>
							</TableRow>
						) : (
							clientsList.map((client) => (
								<TableRow key={client.id} className="group transition-colors hover:bg-muted/30">
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
												{client.name.charAt(0).toUpperCase()}
											</div>
											<div className="flex flex-col">
												<Link href={`/clients/${client.id}`} className="font-semibold hover:text-primary transition-colors">
													{client.name}
												</Link>
												<span className="text-xs text-muted-foreground">Added on {new Date(client.createdAt).toLocaleDateString()}</span>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-col gap-1">
											{client.email && (
												<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
													<Mail className="h-3.5 w-3.5" />
													{client.email}
												</div>
											)}
											{client.phone && (
												<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
													<Phone className="h-3.5 w-3.5" />
													{client.phone}
												</div>
											)}
										</div>
									</TableCell>
									<TableCell>
										{client.address ? (
											<div className="flex items-start gap-1.5 text-sm text-muted-foreground max-w-[200px]">
												<MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
												<span className="line-clamp-2">{client.address}</span>
											</div>
										) : (
											<span className="text-muted-foreground opacity-50">-</span>
										)}
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm" asChild>
											<Link href={`/clients/${client.id}/edit`} className="flex items-center gap-1">
												Edit
												<ExternalLink className="ml-1 h-3.5 w-3.5" />
											</Link>
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Mobile View: Cards */}
			<div className="grid gap-4 md:hidden">
				{clientsList.length === 0 ? (
					<div className="bg-background rounded-xl p-8 border text-center text-muted-foreground">
						<User className="h-10 w-10 mx-auto mb-2 opacity-20" />
						<p>No clients found.</p>
					</div>
				) : (
					clientsList.map((client) => (
						<Card key={client.id} className="overflow-hidden border-none shadow-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
											{client.name.charAt(0).toUpperCase()}
										</div>
										<h3 className="font-bold">{client.name}</h3>
									</div>
									<Button variant="ghost" size="icon" asChild>
										<Link href={`/clients/${client.id}/edit`}>
											<ExternalLink className="h-4 w-4" />
										</Link>
									</Button>
								</div>
								<div className="space-y-2 text-sm">
									{client.email && (
										<div className="flex items-center gap-2 text-muted-foreground">
											<Mail className="h-4 w-4" />
											{client.email}
										</div>
									)}
									{client.phone && (
										<div className="flex items-center gap-2 text-muted-foreground">
											<Phone className="h-4 w-4" />
											{client.phone}
										</div>
									)}
									{client.address && (
										<div className="flex items-start gap-2 text-muted-foreground">
											<MapPin className="h-4 w-4 mt-0.5" />
											<span>{client.address}</span>
										</div>
									)}
								</div>
                                <div className="mt-4 pt-4 border-t">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/clients/${client.id}`}>View Details</Link>
                                    </Button>
                                </div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
