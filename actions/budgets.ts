'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Récupérer tous les budgets de l'utilisateur connecté
export async function getBudgets() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  return prisma.budget.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Ajouter un nouveau budget
export async function createBudget(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const category = formData.get('category') as string;
  const maximum = parseFloat(formData.get('maximum') as string);
  const theme = formData.get('theme') as string | null;
  // Validation
  if (!category) throw new Error('The category is required');
  if (isNaN(maximum)) throw new Error('The maximum amount must be a number');

  await prisma.budget.create({
    data: {
      category,
      maximum,
      theme,
      userId: session.user.id,
    },
  });

  revalidatePath('/budgets');
  redirect('/budgets');
}

// Mettre à jour un budget existant
export async function updateBudget(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }
  console.log(formData);
  const id = formData.get('id') as string;
  const category = formData.get('category') as string;
  const maximum = parseFloat(formData.get('maximum') as string);
  const theme = formData.get('theme') as string | null;

  // Validation
  if (!id) throw new Error('Budget ID required');
  if (!category) throw new Error('The category is required');
  if (isNaN(maximum)) throw new Error('The maximum amount must be a number');

  // Vérifier que le budget appartient à l'utilisateur
  const existingBudget = await prisma.budget.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingBudget || existingBudget.userId !== session.user.id) {
    throw new Error('Budget not found or unauthorised access');
  }

  await prisma.budget.update({
    where: { id },
    data: {
      category,
      maximum,
      theme,
    },
  });

  revalidatePath('/budgets');
  redirect('/budgets');
}

// Supprimer un budget
export async function deleteBudget(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const id = formData.get('id') as string;

  // Vérifier que le budget appartient à l'utilisateur
  const existingBudget = await prisma.budget.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingBudget || existingBudget.userId !== session.user.id) {
    throw new Error('Budget not found or unauthorised access');
  }

  await prisma.budget.delete({
    where: { id },
  });

  revalidatePath('/budgets');
}
