import { BudgetCategory } from '@/lib/utilsBudgets';
import BudgetCard from './BudgetCard';
import { BudgetsProps } from '@/app/(dashboard)/budgets/page';

function BudgetList({ budgets }: BudgetsProps) {
  return budgets ? (
    <ul className="flex flex-col gap-6">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          {...budget}
          theme={budget.theme ?? '#f2cdac'}
          category={budget.category as BudgetCategory}
        />
      ))}
    </ul>
  ) : (
    <p>No Budgets</p>
  );
}

export default BudgetList;
