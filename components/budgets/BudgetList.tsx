
import BudgetCard from './BudgetCard';
import { Budget } from '@prisma/client';

function BudgetList({ budgets }: { budgets: Budget[] }) {
  return budgets.length > 0 ? (
    <ul className="flex flex-col gap-6">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          
        />
      ))}
    </ul>
  ) : (
    <p>No Budgets</p>
  );
}

export default BudgetList;
