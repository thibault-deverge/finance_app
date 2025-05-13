'use client';
import BudgetPieChart from '@/components/ui/BudgetPieChart';
import CardHeader from '@/components/ui/CardHeader';
import CardMini from '@/components/ui/CardMini';
import { Budget, Transaction } from '@prisma/client';

function BudgetsCard({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  const MAX_DISPLAY = 4;
  const displayedBudget = budgets.slice(0, MAX_DISPLAY);

  if (budgets.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">
          No budgets found
        </h2>
      </section>
    );
  }
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8 shadow-sm">
      <CardHeader title="Budgets" href="/budgets" />
      <div className="mb-8 flex w-full flex-col items-center justify-between md:flex-row">
        <BudgetPieChart budgets={budgets} transactions={transactions} />

        <div className="col-span-full mx-auto grid w-full max-w-[300px] grid-cols-2 gap-4 md:max-w-[120px] md:grid-cols-1">
          {displayedBudget.length > 0 &&
            displayedBudget.map((budget) => (
              <CardMini
                key={budget.id}
                title={budget.category}
                amount={budget.maximum}
                color={budget.theme || '#000000'}
                type="budgets"
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default BudgetsCard;
