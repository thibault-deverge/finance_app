import { formatDateToShortString } from '@/lib/utils';
import { SpendingCardType } from './BudgetCard';
import { formatAmountBudget } from '@/lib/utilsBudgets';

function SpendingCard({ name, date, amount }: SpendingCardType) {
  return (
    <li className="my-5 flex items-center justify-between">
      <h4 className="text-preset-5-bold text-grey-900">{name}</h4>
      <div className="flex flex-col items-end">
        <p className="text-preset-5-bold text-grey-900">
          {formatAmountBudget(amount)}
        </p>
        <p className="text-preset-5 text-grey-500">
          {formatDateToShortString(date)}
        </p>
      </div>
    </li>
  );
}

export default SpendingCard;
