import {
  BudgetCategory,
  getAllTransactions,
  getSpent,
} from '@/lib/utilsBudgets';
import BudgetDropDown from './BudgetDropDown';
import { Progress } from '@/components/ui/progress';
import CardMini from '../ui/CardMini';
import React from 'react';
import SpendingCard from './SpendingCard';
import LatestSpending from './LatestSpending';

type Budget = {
  category: BudgetCategory;
  maximum: number;
  theme: string;
};

export type SpendingCardType = {
  name: string;
  date: string;
  amount: number;
};

function BudgetCard({ category, maximum, theme }: Budget) {
  const spent = getSpent(category);
  const percentage = parseFloat(((spent / maximum) * 100).toFixed(2));
  const allTransactions = getAllTransactions(category);

  return (
    <li className="flex flex-col gap-5 rounded-xl bg-white px-5 py-7">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: theme }}
            className={`h-4 w-4 rounded-full`}
          ></div>
          <h3 className="text-preset-2 text-grey-900">{category}</h3>
        </div>
        <BudgetDropDown />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-grey-500 text-preset-4">Maximum of ${maximum}</p>
        <Progress
          className="bg-beige-100 h-8 w-full rounded-md" // rounded-md équivaut à environ 4px
          value={percentage}
          indicatorColor={theme}
          innerPadding={4}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <CardMini title="Spent" amount={spent} color={theme} type="budgets" />
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
      {/* <div className="bg-beige-100 rounded-xl p-4">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-preset-3 text-grey-900">Latest Spending</h3>
          <div className="flex items-center gap-3">
            <p className="text-preset-4 text-grey-500">Sell All</p>
            <img
              className="cursor-pointer"
              src="images/icons/icon-caret-right.svg"
              alt="icon carret right"
            />
          </div>
        </div>
        {allTransactions &&
          allTransactions.map((transaction) => (
            <ul>
              <React.Fragment key={transaction.name}>
                <SpendingCard {...transaction} />
                <div className="border-grey-500 my-4 h-px border-b last:border-b-0"></div>
              </React.Fragment>
            </ul>
          ))}
      </div> */}
    </li>
  );
}
//{ title, amount, color, type }
// {name,date,amount}
export default BudgetCard;
