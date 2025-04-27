import { Budget } from '@/lib/type';
import { BudgetCategory, getSpent } from '@/lib/utilsBudgets';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardMiniBudget from './CardMiniBudgets';

const MAX_DISPLAY = 4;

function SummarySpending({ budgets }: { budgets: Budget[] }) {
  console.log(budgets);
  const displayedBudget = budgets.slice(0, MAX_DISPLAY);
  return (
    <div className="mx-5">
      <h2 className="text-preset-2 text-grey-900 mb-6">Spending Summary</h2>
      <ul>
        {displayedBudget &&
          displayedBudget.map(({ id, category, maximum, theme }) => (
            <React.Fragment key={id}>
              <CardMiniBudget
                category={category}
                maximum={maximum}
                theme={theme || '#000000'}
                spent={getSpent(category)}
              />
              <div className="my-4 h-px border-b border-gray-300 last:border-b-0"></div>
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
}

export default SummarySpending;
