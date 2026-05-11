import { getSettings } from "@/actions/settings";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SettingsForm } from "@/components/settings-form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
	const [adminUser] = await db.select().from(user).where(eq(user.role, "admin")).limit(1);

	if (!adminUser) {
		redirect("/login");
	}

	const settings = await getSettings(adminUser.id);

	return (
		<div className="max-w-5xl mx-auto space-y-10 py-8 animate-in fade-in duration-700">
            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black mozilla-headline tracking-tight">
                    Settings
                </h1>
                <p className="text-muted-foreground google-sans">
                    Configure your business profile and invoice defaults.
                </p>
            </div>

			<SettingsForm userId={adminUser.id} initialData={settings} />
		</div>
	);
}
