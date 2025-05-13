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
