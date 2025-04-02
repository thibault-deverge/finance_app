import { prisma } from "@/lib/prisma";

export async function getTransactions() {
	try {
		const data = await prisma.transaction.findMany();
		return data;
	} catch (error) {
		console.error("Error fetching transactions:", error);
	}
}
