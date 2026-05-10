import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "../db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification,
		},
	}),
	secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-for-development-only-12345678",
	baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	session: {
		strategy: "jwt",
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60, // 1 hour
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "google_id",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google_secret",
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "github_id",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "github_secret",
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "user",
			},
		},
	},
    plugins: [],
	trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
});
