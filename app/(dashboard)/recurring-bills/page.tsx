/* eslint-disable @next/next/no-img-element */
import { getTransactions } from '@/services/transactionService';
import { TRANSACTION_PER_PAGE } from '@/lib/constants';

import PaginationControls from '@/components/pagination/PaginationControls';
import Title from '@/components/ui/Title';
import RecurringBillSection from '@/components/recurring/RecurringBillSection';

type PageProps = {
  searchParams: {
    page?: number;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const page = Number((await searchParams).page) || 1;
  const { transactions, totalCount } = await getTransactions({
    search: '',
    sortBy: 'latest',
    category: 'all',
    page,
    onlyRecurringBills: true,
  });
  const totalPages = Math.ceil(totalCount / TRANSACTION_PER_PAGE);

  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Recuring Bills" />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex flex-col gap-3 md:flex-row md:gap-6 xl:min-w-[21.25rem] xl:flex-col">
          <section className="bg-grey-900 flex flex-grow items-center gap-5 rounded-xl px-5 py-6 text-white md:flex-col md:items-start md:justify-end md:gap-8 md:px-6">
            <img
              src="/images/icons/icon-recurring-bills.svg"
              alt="Recurring Bills"
              className="h-7 w-8"
            />
            <div className="flex flex-col gap-3">
              <h2 className="text-preset-4">Total bills</h2>
              <span className="text-preset-1">$384.98</span>
            </div>
          </section>

          <section className="flex flex-grow flex-col gap-5 rounded-xl bg-white p-5">
            <h2 className="text-preset-3 text-grey-900">Summary</h2>

            <div>
              <div className="text-preset-5 text-grey-500 flex justify-between border-b border-gray-100 pb-4">
                <span>Paid Bills</span>
                <span className="text-preset-5-bold text-grey-900">
                  2 ($320.00)
                </span>
              </div>

              <div className="text-preset-5 text-grey-500 flex justify-between border-b border-gray-100 py-4">
                <span>Total Upcoming Bills</span>
                <span className="text-preset-5-bold text-grey-900">
                  6 ($1.230.00)
                </span>
              </div>

              <div className="text-red text-preset-5 flex justify-between pt-4">
                <span>Due Soon</span>
                <span className="text-preset-5-bold">2 ($42.00)</span>
              </div>
            </div>
          </section>
        </div>

        <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
          <RecurringBillSection transactions={transactions} />
          <PaginationControls totalPages={totalPages} />
        </section>
      </div>
    </section>
  );
}
