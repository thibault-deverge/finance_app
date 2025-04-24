// app/actions/budget.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

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
  console.log(session);
  if (!session?.user?.id) {
    throw new Error('Vous devez être connecté');
  }

  const category = formData.get('category') as string;
  const maximum = parseFloat(formData.get('maximum') as string);
  const theme = formData.get('theme') as string | null;
  // Validation
  if (!category) throw new Error('La catégorie est requise');
  if (isNaN(maximum)) throw new Error('Le montant maximum doit être un nombre');

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
    throw new Error('Vous devez être connecté');
  }

  const id = formData.get('id') as string;
  const category = formData.get('category') as string;
  const maximum = parseFloat(formData.get('maximum') as string);
  const theme = formData.get('theme') as string | null;

  // Validation
  if (!id) throw new Error('ID du budget requis');
  if (!category) throw new Error('La catégorie est requise');
  if (isNaN(maximum)) throw new Error('Le montant maximum doit être un nombre');

  // Vérifier que le budget appartient à l'utilisateur
  const existingBudget = await prisma.budget.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingBudget || existingBudget.userId !== session.user.id) {
    throw new Error('Budget non trouvé ou accès non autorisé');
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
    throw new Error('Vous devez être connecté');
  }

  const id = formData.get('id') as string;

  // Vérifier que le budget appartient à l'utilisateur
  const existingBudget = await prisma.budget.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingBudget || existingBudget.userId !== session.user.id) {
    throw new Error('Budget non trouvé ou accès non autorisé');
  }

  await prisma.budget.delete({
    where: { id },
  });

  revalidatePath('/budgets');
}
