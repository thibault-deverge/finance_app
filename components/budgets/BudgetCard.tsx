import { Budget } from '@prisma/client';
import { getAllTransactions, getSpent } from '@/lib/utilsBudgets';
import { TransactionsByCategory } from '@/lib/type';

import CardMini from '@/components/ui/CardMini';
import EditDeleteBudget from '@/components/budgets/EditDeleteBudget';
import LatestSpending from '@/components/budgets/LatestSpending';
import { Progress } from '@/components/ui/progress';

function BudgetCard({
  budget,
  transactionsByCategory,
}: {
  budget: Budget;
  transactionsByCategory: TransactionsByCategory;
}) {
  const { category, maximum, theme } = budget;
  const spent = getSpent(category, transactionsByCategory);
  const percentage = parseFloat(((spent / maximum) * 100).toFixed(2));
  const allTransactions = getAllTransactions(category, transactionsByCategory);

  return (
    <li className="flex flex-col gap-5 rounded-xl bg-white px-5 py-7">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: theme ?? '#f2cdac' }}
            className={`h-4 w-4 rounded-full`}
          ></div>
          <h3 className="text-preset-2 text-grey-900">{category}</h3>
        </div>
        <EditDeleteBudget budget={budget} />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-grey-500 text-preset-4">Maximum of ${maximum}</p>
        <Progress
          className="bg-beige-100 h-8 w-full rounded-md" // rounded-md équivaut à environ 4px
          value={percentage}
          indicatorColor={theme ?? '#f2cdac'}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <CardMini
            title="Spent"
            amount={spent}
            color={theme ?? '#f2cdac'}
            type="budgets"
          />
        </div>
        <div className="w-1/2">
          <CardMini
            title="Free"
            amount={maximum}
            color="#F8F4F0"
            type="budgets"
          />
        </div>
      </div>
      <LatestSpending allTransactions={allTransactions} />
    </li>
  );
}

export default BudgetCard;
