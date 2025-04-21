import data from '@/data/data.json';

import {
  getAllTransactions,
  getLastThreeTransactions,
  getMax,
  getSpent,
  getSpentThisMonth,
} from '@/lib/utilsBudgets';
import BudgetCard from './BudgetCard';

const { budgets } = data;

const entertainmentSpent = getSpentThisMonth('Entertainment');
const latestEntertainmentTx = getLastThreeTransactions('Entertainment');
const spentThisMonth = getSpentThisMonth('Entertainment');
const spent = getSpent('Entertainment');
const max = getMax('Entertainment');
const allEntertainmentTx = getAllTransactions('Entertainment');

console.log(allEntertainmentTx);

function BudgetList() {
  return budgets ? (
    <ul>
      {budgets.map((budget) => (
        <BudgetCard key={budget.category} {...budget} />
      ))}
    </ul>
  ) : (
    <p>No Budgets</p>
  );
}

export default BudgetList;
