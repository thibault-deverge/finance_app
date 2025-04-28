import { getTransactions } from '@/services/transactionService';
import { TRANSACTION_PER_PAGE } from '@/lib/constants';

import TransactionsSection from '@/components/transactions/TransactionSection';
import PaginationControls from '@/components/pagination/PaginationControls';
import Title from '@/components/ui/Title';

type PageProps = {
  searchParams: {
    search?: string;
    sortBy?: string;
    category?: string;
    page?: number;
  };
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
  });
  const totalPages = Math.ceil(totalCount / TRANSACTION_PER_PAGE);

  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Transactions" />
      <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
        <TransactionsSection transactions={transactions} />
        <PaginationControls totalPages={totalPages} />
      </section>
    </section>
  );
}
