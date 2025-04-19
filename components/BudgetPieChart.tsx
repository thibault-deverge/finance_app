import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import data from '../data/data.json';

const { budgets: allBudgets } = data;

function BudgetPieChart() {
  return (
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
  );
}

export default BudgetPieChart;
