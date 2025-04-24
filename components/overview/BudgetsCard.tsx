'use client';

import { BudgetsProps } from '@/app/(dashboard)/overview/page';
import { v4 as uuidv4 } from 'uuid';
import BudgetPieChart from '../ui/BudgetPieChart';
import CardHeader from '../ui/CardHeader';
import CardMini from '../ui/CardMini';

const MAX_DISPLAY = 4;

function BudgetsCard({ budgets }: BudgetsProps) {
  const displayedBudget = budgets.slice(0, MAX_DISPLAY).map((transaction) => ({
    ...transaction,
    id: uuidv4(),
  }));
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <CardHeader title="Budgets" href="/budgets" />
      <div className="md:flex">
        <BudgetPieChart budgets={budgets} />

        <div className="col-span-full mx-auto grid w-full max-w-[340px] grid-cols-2 gap-4">
          {displayedBudget &&
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
