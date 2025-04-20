'use client';

import BudgetPieChart from '@/components/BudgetPieChart';
import AddBudget from '@/components/budgets/AddBudget';
import BudgetList from '@/components/budgets/BudgetList';
import CardMiniBudgets from '@/components/ui/CardMiniBudgets';
import Title from '@/components/ui/Title';
import data from '@/data/data.json';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const MAX_DISPLAY = 4;
const { budgets: allBudgets } = data;

const displayedBudget = allBudgets.slice(0, MAX_DISPLAY).map((transaction) => ({
  ...transaction,
  id: uuidv4(),
}));

function Page() {
  return (
    <section className="col-span-full h-screen px-4 py-6 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <header className="mb-8.5 flex items-center justify-between">
        <Title name="Budgets" />
        <AddBudget />
      </header>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-8 rounded-xl bg-white">
          <BudgetPieChart />
          <div className="mx-5">
            <h2 className="text-preset-2 text-grey-900 mb-6">
              Spending Summary
            </h2>
            {displayedBudget &&
              displayedBudget.map(({ id, category, maximum, theme }) => (
                <React.Fragment key={id}>
                  <CardMiniBudgets
                    category={category}
                    maximum={maximum}
                    theme={theme}
                    spent={25}
                  />
                  <div className="my-4 h-px border-b border-gray-300 last:border-b-0"></div>
                </React.Fragment>
              ))}
          </div>
        </div>
        <BudgetList />
      </div>
    </section>
  );
}

export default Page;
