import { prisma } from '@/lib/prisma';

export async function getBudget() {
  try {
    const data = await prisma.budget.findMany();
    return data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
}

export async function addBudget(newBudget: {
  category: string;
  maximum: number;
  theme: string;
}) {
  try {
    const data = await prisma.budget.create({
      data: newBudget,
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error adding a new budget:', error);
    throw error;
  }
}
