import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<any>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

    const userRole = session.user?.role;
    if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/clients/:path*", "/invoices/:path*", "/settings/:path*"],
};
