'use client';
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import data from '../../data/data.json';
import { getTotalCurrent, getTotalMaximum } from '@/lib/utilsBudgets';

interface PieChartViewBox {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  width: number;
  height: number;
}

const { budgets: allBudgets } = data;

function BudgetPieChart() {
  const totalCurrent = getTotalCurrent();
  const totalMaximum = getTotalMaximum();

  const innerPieOuterRadius = 80;
  const innerPieInnerRadius = innerPieOuterRadius - 15; // Épaisseur de 15px
  const outerPieOuterRadius = innerPieOuterRadius + 30; // Épaisseur de 30px
  const outerPieInnerRadius = innerPieOuterRadius;

  const innerdata = allBudgets.map((budget) => ({
    ...budget,
    value: budget.maximum,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        {/* Anneau extérieur */}
        <Pie
          data={allBudgets}
          dataKey="maximum"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={outerPieInnerRadius}
          outerRadius={outerPieOuterRadius}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
        >
          {allBudgets.map((entry, index) => (
            <Cell key={`outer-cell-${index}`} fill={entry.theme} />
          ))}
        </Pie>

        {/* Anneau intérieur */}
        <Pie
          data={innerdata}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={innerPieInnerRadius}
          outerRadius={innerPieOuterRadius}
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
        >
          {innerdata.map((entry, index) => (
            <Cell
              key={`inner-cell-${index}`}
              fill={entry.theme}
              fillOpacity={0.35}
            />
          ))}

          <Label
            content={(props: any) => {
              const viewBox = props.viewBox as PieChartViewBox;
              const cx = viewBox?.cx || 0;
              const cy = viewBox?.cy || 0;

              return (
                <g>
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: '24px', fontWeight: 'bold' }}
                  >
                    ${totalCurrent}
                  </text>
                  <text
                    x={cx}
                    y={cy + 15}
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: '14px', fill: '#888' }}
                  >
                    of ${totalMaximum} limit
                  </text>
                </g>
              );
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BudgetPieChart;
