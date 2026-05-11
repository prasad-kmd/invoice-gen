import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HomePageContent from "@/components/home-content";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <HomePageContent session={session} />;
}
