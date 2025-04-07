'use client';

import { useFinance } from '@/components/context/FinanceProvider';
import SideNavigation from '@/components/SideNavigation';
import Title from '@/components/Title';
import DashboardCards from '@/components/DashboardCards';

function Dashboard() {
  const { isVisible, setIsVisible } = useFinance();
  console.log(isVisible);
  return (
    <main
      className={`transition-grid-cols grid min-h-screen grid-cols-1 duration-300 ease-in-out ${isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[64px_1fr]'}`}
    >
      <SideNavigation isVisible={isVisible} setIsVisible={setIsVisible} />
      <section className="grid min-h-screen grid-cols-12 gap-8 px-4 py-6">
        <div className="col-span-full mb-8">
          <Title name="Overview" />
        </div>

        <div className="col-span-full mb-8">
          <DashboardCards />
        </div>

        <div className="col-span-full flex h-full flex-grow flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-8 md:w-7/12">
            <div className="h-1/4 rounded-lg bg-yellow-400 p-4">Pots</div>
            <div className="h-3/4 rounded-lg bg-green-400 p-4">
              Transactions
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 md:w-5/12">
            <div className="h-3/5 rounded-lg bg-red-400 p-4">Budgets</div>
            <div className="h-2/5 rounded-lg bg-blue-400 p-4">
              Recurring Bills
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
