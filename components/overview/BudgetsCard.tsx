'use client';

import { Budget } from '@/lib/type';
import BudgetPieChart from '../ui/BudgetPieChart';
import CardHeader from '../ui/CardHeader';
import CardMini from '../ui/CardMini';

function BudgetsCard({ budgets }: { budgets: Budget[] }) {
  const MAX_DISPLAY = 4;
  const displayedBudget = budgets.slice(0, MAX_DISPLAY);

  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <CardHeader title="Budgets" href="/budgets" />
      <div className="md:flex">
        <BudgetPieChart budgets={budgets} />

        <div className="col-span-full mx-auto grid w-full max-w-[340px] grid-cols-2 gap-4">
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
