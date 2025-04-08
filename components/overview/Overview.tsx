import OverviewCards from '@/components/overview/OverviewCards';
import Title from '@/components/ui/Title';
import PotsCard from './PotsCard';
import TransactionsCard from './TransactionsCard';

function Overview() {
  return (
    <section className="col-span-full h-screen px-4 py-6 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <div className="col-span-full mb-8">
        <Title name="Overview" />
      </div>

      <div className="col-span-full mb-8">
        <OverviewCards />
      </div>

      <div className="col-span-full flex w-full flex-col gap-8 xl:h-full xl:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <PotsCard />
          <TransactionsCard />
        </div>

        <div className="flex flex-1 flex-col gap-8 xl:h-full">
          <div className="rounded-lg bg-red-400 p-4">Budgets</div>
          <div className="rounded-lg bg-blue-400 p-4">Recurring Bills</div>
        </div>
      </div>
    </section>
  );
}

export default Overview;
