'use client';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import CardHeader from '../ui/CardHeader';
import CardMini from '../ui/CardMini';
import data from '../../data/data.json';

const MAX_DISPLAY = 4;
const { budgets: allBudgets } = data;

const displayedBudget = allBudgets.slice(0, MAX_DISPLAY).map((transaction) => ({
  ...transaction,
  id: uuidv4(),
}));

function BudgetsCard() {
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <CardHeader title="Budgets" href="/budgets" />
      <div className="md:flex">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={allBudgets}
              dataKey="maximum"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {allBudgets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.theme} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="col-span-full mx-auto grid w-full max-w-[340px] grid-cols-2 gap-4">
          {displayedBudget &&
            displayedBudget.map((budget) => (
              <CardMini
                key={budget.id}
                title={budget.category}
                amount={budget.maximum}
                color={budget.theme}
                type="budgets"
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default BudgetsCard;
