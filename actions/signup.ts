"use server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/schemas";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export async function signupAction(data: SignupInput) {
  const safeData = signUpSchema.parse(data);
  const { name, email, password } = safeData;

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
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}
