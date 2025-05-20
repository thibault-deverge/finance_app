import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getAllBalances() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  return prisma.balance.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Met à jour la balance d'un utilisateur en fonction des montants de transaction
 * @param userId - ID de l'utilisateur
 * @param newAmount - Nouveau montant de la transaction
 * @param oldAmount - Ancien montant de la transaction (0 pour une création, montant actuel pour mise à jour/suppression)
 */
export async function updateBalance(
  userId: string,
  newAmount: number,
  oldAmount: number = 0
) {
  // Récupérer la balance actuelle de l'utilisateur
  const currentBalance = await prisma.balance.findFirst({
    where: { userId },
  });

  if (!currentBalance) {
    // Si pas de balance, en créer une nouvelle
    return prisma.balance.create({
      data: {
        current: newAmount,
        income: newAmount > 0 ? newAmount : 0,
        expenses: newAmount < 0 ? Math.abs(newAmount) : 0,
        userId,
      },
    });
  }

  // --- CALCUL DU NOUVEL ÉTAT DE LA BALANCE ---

  // 1. Ajuster la balance courante (simple addition/soustraction)
  const newCurrent = currentBalance.current - oldAmount + newAmount;

  // 2. Calculer les nouveaux income/expenses en tenant compte des changements de signe
  let newIncome = currentBalance.income;
  let newExpenses = currentBalance.expenses;

  // Annuler les effets de l'ancien montant
  if (oldAmount > 0) {
    // Si l'ancienne transaction était positive, réduire income
    newIncome -= oldAmount;
  } else if (oldAmount < 0) {
    // Si l'ancienne transaction était négative, réduire expenses
    newExpenses -= Math.abs(oldAmount);
  }

  // Ajouter les effets du nouveau montant
  if (newAmount > 0) {
    // Si la nouvelle transaction est positive, augmenter income
    newIncome += newAmount;
  } else if (newAmount < 0) {
    // Si la nouvelle transaction est négative, augmenter expenses
    newExpenses += Math.abs(newAmount);
  }

  // S'assurer que les valeurs ne deviennent pas négatives (par précaution)
  newIncome = Math.max(0, newIncome);
  newExpenses = Math.max(0, newExpenses);

  // Mettre à jour la balance
  return prisma.balance.update({
    where: { id: currentBalance.id },
    data: {
      current: newCurrent,
      income: newIncome,
      expenses: newExpenses,
      updatedAt: new Date(),
    },
  });
}
