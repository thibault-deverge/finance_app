import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import GitHub from "next-auth/providers/github";
import { redirect } from "next/navigation";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authSchema } from "./schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				// Parse credentials to zod schema
				const result = authSchema.safeParse(credentials);
				if (!result.success) return null;

				// get user from its email
				const { email, password } = result.data;
				const user = await prisma.user.findUnique({ where: { email } });
				if (!user || !user.password) return null;

				// compare password
				const passwordMatches = await bcrypt.compare(password, user.password);
				if (!passwordMatches) return null;

				return user;
			},
		}),
		GitHub,
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: "/login",
	},
});

export async function requireAuth() {
	"use server";
	const session = await auth();
	if (!session) {
		redirect("/login");
	}
	return session;
}
