import { getTransactions } from '@/actions/transactions';

import Title from '@/components/ui/Title';
import RecurringBillsSection from '@/components/recurring/RecurringBillsSection';
import TotalBillsCard from '@/components/recurring/TotalBillsCard';
import SummaryBillsCard from '@/components/recurring/SummaryBillsCard';

type PageProps = {
  searchParams: Promise<{
    search?: string;
    sortBy?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  console.log('searchParams', searchParams);
  const search = (await searchParams).search || '';
  const sortBy = (await searchParams).sortBy || 'latest';

  const { transactions } = await getTransactions({
    search,
    sortBy,
    category: 'all',
    page: 1,
    onlyRecurringBills: true,
  });

  const totalAmount = transactions.reduce(
    (sum, tx) => sum + Math.abs(tx.amount),
    0
  );

  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Recuring Bills" />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6 xl:min-w-[21.25rem] xl:flex-col">
          <TotalBillsCard totalAmount={totalAmount} />
          <SummaryBillsCard transactions={transactions} />
        </div>

        <RecurringBillsSection transactions={transactions} />
      </div>
    </section>
  );
}
