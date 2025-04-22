/* eslint-disable @next/next/no-img-element */
import { getTransactions } from '@/services/transactionService';

import TransactionsSection from '@/components/transactions/TransactionSection';
import Title from '@/components/ui/Title';

type PageProps = {
  searchParams: {
    search?: string;
    sortBy?: string;
    category?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const search = (await searchParams).search || '';
  const sortBy = (await searchParams).sortBy || 'latest';
  const category = (await searchParams).category || 'all';

  const transactions = await getTransactions({ search, sortBy, category });

  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Transactions" />
      <TransactionsSection transactions={transactions} />
    </section>
  );
}
