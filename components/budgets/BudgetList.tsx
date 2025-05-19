import { TransactionsByCategory } from '@/lib/type';
import BudgetCard from './BudgetCard';
import { Budget } from '@prisma/client';

function BudgetList({
  budgets,
  transactionsByCategory,
}: {
  budgets: Budget[];
  transactionsByCategory: TransactionsByCategory;
}) {
  if (budgets.length === 0) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">
          No budgets found
        </h2>
      </section>
    );
  }
  return (
    <ul className="flex flex-col gap-6">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          transactionsByCategory={transactionsByCategory}
        />
      ))}
    </ul>
  );
}

export default BudgetList;
