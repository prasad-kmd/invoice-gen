import { getSettings } from "@/actions/settings";
import { db } from "@/lib/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SettingsForm } from "@/components/settings-form";
import { redirect } from "next/navigation";
import { MicroBadge } from "@/components/ui/design-system";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
	const [adminUser] = await db.select().from(user).where(eq(user.role, "admin")).limit(1);

	if (!adminUser) {
		redirect("/login");
	}

	const settings = await getSettings(adminUser.id);

	return (
		<div className="max-w-4xl space-y-10">
			<div>
                <MicroBadge className="mb-2">Configuration</MicroBadge>
				<h1 className="text-4xl font-black mozilla-headline tracking-tighter">Settings</h1>
				<p className="text-muted-foreground local-inter mt-1">Configure your business profile and invoice defaults.</p>
			</div>

			<SettingsForm userId={adminUser.id} initialData={settings} />
		</div>
	);
}
