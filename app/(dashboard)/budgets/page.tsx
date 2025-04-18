'use client';

import AddBudget from '@/components/budgets/AddBudget';
import Title from '@/components/ui/Title';

function Page() {
  return (
    <section className="col-span-full h-screen px-4 py-6 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <header className="flex items-center justify-between">
        <Title name="Budgets" />
        <AddBudget />
      </header>
    </section>
  );
}

export default Page;
