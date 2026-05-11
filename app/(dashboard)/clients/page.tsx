import { getClients } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { Plus, Search, User, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q;
  const clientsList = await getClients(query);

  return (
    <div className="space-y-10 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black mozilla-headline tracking-tight">
            Clients
          </h1>
          <p className="text-muted-foreground google-sans">
            Manage your client database and contact information.
          </p>
        </div>
        <Button asChild className="rounded-full h-12 px-6 font-bold google-sans shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
          <Link href="/clients/new">
            <Plus className="mr-2 h-5 w-5" />
            Add New Client
          </Link>
        </Button>
      </div>

      <div className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <form>
          <input
            name="q"
            type="text"
            placeholder="Search clients by name, email, or phone..."
            defaultValue={query}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card/50 backdrop-blur-md border border-border/40 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all google-sans"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientsList.length === 0 ? (
          <div className="col-span-full py-20 text-center rounded-[2.5rem] border border-dashed border-border/60">
            <User className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground google-sans">No clients found matching your search.</p>
          </div>
        ) : (
          clientsList.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`} className="block group">
              <div className="h-full p-6 rounded-[2rem] border border-border/40 bg-card/60 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:bg-card/80">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-bold mozilla-headline tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {client.name}
                </h3>

                <div className="space-y-3">
                  {client.email && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground google-sans">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground google-sans">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground google-sans">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-border/40">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 local-jetbrains-mono">
                        View Profile
                    </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
