import BudgetPieChart from '@/components/ui/BudgetPieChart';
import AddBudget from '@/components/budgets/AddBudget';
import BudgetList from '@/components/budgets/BudgetList';
import SummarySpending from '@/components/budgets/SummarySpending';
import Title from '@/components/ui/Title';
import { Budget, Transaction } from '@prisma/client';
import { BudgetCategory, TransactionsByCategory } from '@/lib/type';

function Budgets({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  // Liste des catégories uniques basées sur les transactions
  const categoryNames = [...new Set(transactions.map((t) => t.category))];

  // Récupérer les transactions groupées par catégorie
  const transactionsByCategory: TransactionsByCategory = categoryNames.reduce(
    (acc, category) => {
      acc[category] = transactions
        .filter((t) => t.category === category)
        .map((t) => ({
          ...t,
          category: t.category as BudgetCategory,
        }));
      return acc;
    },
    {} as TransactionsByCategory
  );

  return (
    <section className="col-span-full h-screen px-4 py-6 md:p-10 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <header className="mb-8.5 flex items-center justify-between">
        <Title name="Budgets" />
        <AddBudget />
      </header>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-8 rounded-xl bg-white pt-8">
          <BudgetPieChart budgets={budgets} transactions={transactions} />
          <SummarySpending
            budgets={budgets}
            transactionsByCategory={transactionsByCategory}
          />
        </div>
        <BudgetList
          budgets={budgets}
          transactionsByCategory={transactionsByCategory}
        />
      </div>
    </section>
  );
}

export default Budgets;
