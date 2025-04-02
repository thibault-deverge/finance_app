import { prisma } from "@/lib/prisma";

export async function getBalance() {
	try {
		const data = await prisma.balance.findMany();
		return data;
	} catch (error) {
		console.error("Error fetching balance:", error);
	}
}
