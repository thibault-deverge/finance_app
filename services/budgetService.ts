import { prisma } from "@/lib/prisma";

export async function getBudget() {
	try {
		const data = await prisma.budget.findMany();
		return data;
	} catch (error) {
		console.error("Error fetching transactions:", error);
	}
}
