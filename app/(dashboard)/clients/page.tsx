import { getClients } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import { GlassCard, MicroBadge } from "@/components/ui/design-system";

export const dynamic = "force-dynamic";

export default async function ClientsPage({ searchParams }: { searchParams: { q?: string } }) {
	const query = (await searchParams).q;
	const clientsList = await getClients(query);

	return (
		<div className="space-y-10">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <MicroBadge className="mb-2">CRM</MicroBadge>
                    <h1 className="text-4xl font-black mozilla-headline tracking-tighter">Clients</h1>
                </div>
				<Button asChild className="rounded-full h-12 px-6 bg-primary hover:bg-primary-focus text-primary-foreground font-bold transition-all hover:scale-105">
					<Link href="/clients/new">
						<Plus className="mr-2 h-4 w-4" />
						Add Client
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<form>
						<Input
                            name="q"
                            placeholder="Search clients by name, email, or phone..."
                            className="pl-12 h-12 rounded-xl bg-card/50 border-border/40 focus:ring-primary/20 transition-all local-inter"
                            defaultValue={query}
                        />
					</form>
				</div>
			</div>

			<GlassCard className="p-0 border-border/40 overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-border/40 bg-card/50">
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Name</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Email</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Phone</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14">Address</TableHead>
								<TableHead className="google-sans text-[11px] uppercase tracking-widest px-6 h-14 text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{clientsList.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="h-40 text-center text-muted-foreground local-inter">
										No clients found.
									</TableCell>
								</TableRow>
							) : (
								clientsList.map((client) => (
									<TableRow key={client.id} className="hover:bg-muted/50 transition-colors border-border/40">
										<TableCell className="px-6 py-4">
											<Link href={`/clients/${client.id}`} className="group flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-bold local-inter text-foreground/90 group-hover:text-primary transition-colors">
												    {client.name}
											    </span>
											</Link>
										</TableCell>
										<TableCell className="px-6 py-4 text-sm local-inter text-muted-foreground">
											{client.email || "-"}
										</TableCell>
										<TableCell className="px-6 py-4 text-sm local-jetbrains-mono text-muted-foreground">
											{client.phone || "-"}
										</TableCell>
										<TableCell className="px-6 py-4 text-sm local-inter text-muted-foreground max-w-xs truncate">
											{client.address || "-"}
										</TableCell>
										<TableCell className="px-6 py-4 text-right">
											<Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" asChild>
                                                <Link href={`/clients/${client.id}`}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Link>
                                            </Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</GlassCard>
		</div>
	);
}
