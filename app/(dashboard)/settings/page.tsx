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
		<div className="mx-auto max-w-4xl space-y-8">
			<div>
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-muted-foreground">Configure your business profile and invoice defaults.</p>
			</div>

			<SettingsForm userId={adminUser.id} initialData={settings} />
		</div>
	);
}
