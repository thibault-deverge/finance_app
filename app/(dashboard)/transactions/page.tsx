import { getTransactions } from '@/actions/transactions';
import { TRANSACTION_PER_PAGE } from '@/lib/constants';

import TransactionsSection from '@/components/transactions/TransactionSection';
import PaginationControls from '@/components/pagination/PaginationControls';
import Title from '@/components/ui/Title';
import AddTransaction from '@/components/transactions/AddTransaction';

type PageProps = {
  searchParams: Promise<{
    search?: string;
    sortBy?: string;
    category?: string;
    page?: number;
    itemPerPage?: number;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const search = (await searchParams).search || '';
  const sortBy = (await searchParams).sortBy || 'latest';
  const category = (await searchParams).category || 'all';
  const page = Number((await searchParams).page) || 1;

  const { transactions, totalCount } = await getTransactions({
    search,
    sortBy,
    category,
    page,
    itemPerPage: TRANSACTION_PER_PAGE,
  });
  const totalPages = Math.ceil(totalCount / TRANSACTION_PER_PAGE);

  return (
    <section className="col-span-full flex h-screen flex-col gap-5 overflow-y-auto px-4 py-6 md:gap-8 md:p-10 md:px-10 md:py-8 xl:col-span-1">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0">
        <Title name="Transactions" />
        <AddTransaction />
      </div>
      <section className="flex flex-col gap-6 rounded-xl bg-white px-5 py-6 md:px-8 md:py-8">
        <TransactionsSection transactions={transactions} />
        <PaginationControls totalPages={totalPages} />
      </section>
    </section>
  );
}
