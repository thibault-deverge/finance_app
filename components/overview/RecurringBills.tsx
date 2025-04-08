import CardHeader from '../ui/CardHeader';
import data from '../../data/data.json';
import {
  calculateFinancialSummary,
  FinancialData,
  FinancialDataResult,
} from '@/lib/utils';
const MAX_DISPLAY = 3;

function getFinancialSummaryForCurrentMonth(
  data: FinancialData
): FinancialDataResult {
  const summary = calculateFinancialSummary(data);
  return {
    paidBills: summary.paidBills.toFixed(2),
    totalUpcoming: summary.totalUpcoming.toFixed(2),
    dueSoon: summary.dueSoon.toFixed(2),
  };
}

const financialData = getFinancialSummaryForCurrentMonth(data);
console.log('Financial Summary for Current Month:', financialData);

function RecurringBills() {
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <CardHeader title="Recurring Bills" href="/recurring-bills" />
    </section>
  );
}

export default RecurringBills;
