import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HomePageContent from "@/components/home-content";
import { FloatingNavbar } from "@/components/floating-navbar";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <FloatingNavbar className="hidden lg:flex" session={session} />
      <HomePageContent session={session} />
    </>
  );
}
