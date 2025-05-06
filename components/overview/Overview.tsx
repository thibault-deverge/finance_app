import OverviewCards from '@/components/overview/OverviewCards';
import Title from '@/components/ui/Title';
import BudgetsCard from './BudgetsCard';
import PotsCard from './PotsCard';
import RecurringBills from './RecurringBills';
import TransactionsCard from './TransactionsCard';
import { Transaction, Balance, Budget } from '@prisma/client';

function Overview({
  budgets,
  transactions,
  balance,
}: {
  budgets: Budget[];
  transactions: Transaction[];
  balance: Balance[];
}) {
  return (
    <section className="col-span-full h-screen px-4 py-6 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <div className="col-span-full mb-8">
        <Title name="Overview" />
      </div>

      <div className="col-span-full mb-8">
        <OverviewCards balance={balance} />
      </div>

      <div className="col-span-full flex w-full flex-col gap-8 xl:h-full xl:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <PotsCard />
          <TransactionsCard transactions={transactions} />
        </div>

        <div className="flex flex-1 flex-col gap-8 xl:h-full">
          <BudgetsCard budgets={budgets} transactions={transactions} />
          <RecurringBills />
        </div>
      </div>
    </section>
  );
}

export default Overview;
