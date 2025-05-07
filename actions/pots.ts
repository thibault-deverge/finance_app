'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Récupérer tous les pots de l'utilisateur connecté
export async function getPots() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  return prisma.pot.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Ajouter un nouveau pot
export async function createPot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const name = formData.get('name') as string;
  const target = parseFloat(formData.get('target') as string);
  const theme = formData.get('theme') as string | null;
  // Validation
  if (!name) throw new Error('The name is required');
  if (isNaN(target)) throw new Error('The maximum amount must be a number');

  await prisma.pot.create({
    data: {
      name,
      target,
      theme,
      total: 0, // Initialize total to 0
      userId: session.user.id,
    },
  });

  revalidatePath('/pots');
  redirect('/pots');
}

// Mettre à jour un pot existant
export async function updatePot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const target = parseFloat(formData.get('target') as string);
  const theme = formData.get('theme') as string | null;

  // Validation
  if (!id) throw new Error('Pot ID required');
  if (!name) throw new Error('The name is required');
  if (isNaN(target)) throw new Error('The target amount must be a number');

  // Vérifier que le pot appartient à l'utilisateur
  const existingPot = await prisma.pot.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingPot || existingPot.userId !== session.user.id) {
    throw new Error('Pot not found or unauthorised access');
  }

  await prisma.pot.update({
    where: { id },
    data: {
      name,
      target,
      theme,
    },
  });

  revalidatePath('/pots');
  redirect('/pots');
}

// Supprimer un pot
export async function deletePot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const id = formData.get('id') as string;

  // Vérifier que le pot appartient à l'utilisateur
  const existingPot = await prisma.pot.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existingPot || existingPot.userId !== session.user.id) {
    throw new Error('Pot not found or unauthorised access');
  }

  await prisma.pot.delete({
    where: { id },
  });

  revalidatePath('/pots');
}

// Fonction pour ajouter de l'argent à un pot
export async function addMoneyToPot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const id = formData.get('id') as string;
  const amount = parseFloat(formData.get('amount') as string);

  // Validation
  if (!id) throw new Error('Pot ID required');
  if (isNaN(amount) || amount <= 0) throw new Error('The amount must be a positive number');

  // Vérifier que le pot appartient à l'utilisateur
  const existingPot = await prisma.pot.findUnique({
    where: { id },
    select: { userId: true, total: true, target: true },
  });

  if (!existingPot || existingPot.userId !== session.user.id) {
    throw new Error('Pot not found or unauthorised access');
  }

  // Calculer le nouveau total
  const newTotal = existingPot.total + amount;
  
  // Option: Vérifier si l'ajout dépasse la cible
  // if (newTotal > existingPot.target) {
  //   throw new Error(`Adding this amount would exceed the target of ${existingPot.target}`);
  // }

  await prisma.pot.update({
    where: { id },
    data: {
      total: newTotal,
      updatedAt: new Date()
    },
  });

  revalidatePath('/pots');
}

// Fonction pour retirer de l'argent d'un pot
export async function withdrawMoneyFromPot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('You must be connected');
  }

  const id = formData.get('id') as string;
  const amount = parseFloat(formData.get('amount') as string);

  // Validation
  if (!id) throw new Error('Pot ID required');
  if (isNaN(amount) || amount <= 0) throw new Error('The amount must be a positive number');

  // Vérifier que le pot appartient à l'utilisateur
  const existingPot = await prisma.pot.findUnique({
    where: { id },
    select: { userId: true, total: true },
  });

  if (!existingPot || existingPot.userId !== session.user.id) {
    throw new Error('Pot not found or unauthorised access');
  }

  // Vérifier si le retrait est possible
  if (amount > existingPot.total) {
    throw new Error(`Cannot withdraw more than the current total (${existingPot.total})`);
  }

  // Calculer le nouveau total
  const newTotal = existingPot.total - amount;

  await prisma.pot.update({
    where: { id },
    data: {
      total: newTotal,
      updatedAt: new Date()
    },
  });

  revalidatePath('/pots');
}
/*
 id: 'cm9o95ifs001ezyz33m5zdzm3',
    name: 'Concert Ticket',
    target: 150,
    total: 110,
    theme: '#626070',
    userId: 'cm9o95j04001izyz3kszpqj4c',
    createdAt: 2025-04-19T13:26:53.080Z,
    updatedAt: 2025-04-19T13:26:53.080Z
*/
