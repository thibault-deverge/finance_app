import data from '@/data/data.json';
import { Budget, Transaction } from '@prisma/client';
import { TransactionsByCategory } from './type';

const { transactions } = data;

export function formatAmountBudget(amount: number): string {
  // Si le montant est négatif, on met le signe moins avant le symbole dollar
  if (amount < 0) {
    return `-$${Math.abs(amount)}`;
  }
  // Si le montant est positif ou zéro
  return `$${amount}`;
}
export function getSpent(
  category: string,
  transactionsByCategory: TransactionsByCategory
): number {
  // Vérifier si la catégorie existe dans transactionsByCategory
  if (!transactionsByCategory || !transactionsByCategory[category]) {
    return 0; // Retourne 0 si la catégorie n'existe pas
  }

  return transactionsByCategory[category].reduce((acc, t) => {
    // On n'ajoute que les montants négatifs
    if (t.amount < 0) {
      acc = acc + Math.abs(t.amount);
    }
    return Number(acc.toFixed(2));
  }, 0);
}

export function getAllTransactions(
  category: string,
  transactionsByCategory: Record<string, any[]>
) {
  if (!transactionsByCategory[category]) {
    return [];
  }

  return [...transactionsByCategory[category]].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() // Du plus ancien au plus récent
  );
}

export function getAllCategories() {
  const categories = transactions.map((t) => t.category); // extrait les catégories
  const uniqueCategories = [...new Set(categories)]; // supprime les doublons
  return uniqueCategories;
}

//##################################################################################
//##################################################################################

export function getTotalCurrent(data: Transaction[]): number {
  const total = data
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);
  return Math.round(Math.abs(total));
}

export function getTotalMaximum(data: Budget[]): number {
  const total = data.reduce((sum, t) => sum + t.maximum, 0);
  return Math.round(total);
}

/*
// Obtenir les 3 dernières transactions d'une catégorie (tous mois confondus)
export function getLastThreeTransactions(category: BudgetCategory) {
  return [...transactionsByCategory[category]]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);
  }
  
  // Obtenir les transactions d'une catégorie pour le mois courant
  export function getCurrentMonthTransactions(category: BudgetCategory) {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = janvier
    const currentYear = now.getFullYear();
    
    return transactionsByCategory[category].filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
        });
        }
        // Calcul du total dépensé ce mois-ci pour une catégorie
        export function getSpentThisMonth(category: BudgetCategory): number {
          return getCurrentMonthTransactions(category).reduce(
            (total, t) => total + t.amount,
            0
            );
            }
            */
// export function getMax(category: BudgetCategory): number | undefined {
//   const budget = data.budgets.find((t) => t.category === category);
//   return budget?.maximum;
// }
