"use server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/schemas";

export interface SignupInput {
	email: string;
	password: string;
}

export async function signupAction(data: SignupInput) {
	const safeData = authSchema.parse(data);
	const { email, password } = safeData;

	// check if email already exists
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		throw new Error("Email already in use");
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create the new user in the database
	const user = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	return user;
}
