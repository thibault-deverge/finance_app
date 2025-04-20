import data from '@/data/data.json';
import BudgetCard from './BudgetCard';

type BudgetTransaction = {
  category: string;
  date: string;
  amount: number;
  name: string;
};

type TransactionsByCategory = Record<string, BudgetTransaction[]>;

const { transactions, budgets } = data;

// Liste des catégories uniques basées sur les transactions
const categoryNames = [...new Set(transactions.map((t) => t.category))];
// Récupérer les transactions groupées par catégorie
const transactionsByCategory: TransactionsByCategory = categoryNames.reduce(
  (acc, category) => {
    acc[category] = transactions.filter((t) => t.category === category);
    return acc;
  },
  {} as TransactionsByCategory
);

// Obtenir les 3 dernières transactions d'une catégorie (tous mois confondus)
function getLastThreeTransactions(category: string) {
  return [...transactionsByCategory[category]]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

// Obtenir les transactions d'une catégorie pour le mois courant
function getCurrentMonthTransactions(category: string) {
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
function getSpentThisMonth(category: string): number {
  return getCurrentMonthTransactions(category).reduce(
    (total, t) => total + t.amount,
    0
  );
}

function getSpent(category: string): number {
  return [...transactionsByCategory[category]].reduce((acc, t) => {
    acc = acc + t.amount;
    return acc;
  }, 0);
}

function getMax(category: string): number | undefined {
  const budget = data.budgets.find((t) => t.category === category);
  return budget?.maximum;
}

const entertainmentSpent = getSpentThisMonth('Entertainment');
const latestEntertainmentTx = getLastThreeTransactions('Entertainment');
const spentThisMonth = getSpentThisMonth('Entertainment');
const spent = getSpent('Entertainment');
const max = getMax('Entertainment');
// console.log(entertainmentSpent);
// console.log(latestEntertainmentTx);
// console.log(spentThisMonth);
console.log(spent);
console.log(max);

function BudgetList() {
  return budgets ? (
    <ul>
      {budgets.map((budget) => (
        <BudgetCard key={budget.category} {...budget} />
      ))}
    </ul>
  ) : (
    <p>No Budgets</p>
  );
}

export default BudgetList;
