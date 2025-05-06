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
