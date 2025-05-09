'use client';
import { Transaction } from '@prisma/client';
import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';
import TransactionList from '@/components/transactions/TransactionList';
import { useUrlSyncedParam } from '@/hooks/useUrlSyncedParam';

type Props = {
  transactions: Transaction[];
};

export default function TransactionsSection({ transactions }: Props) {
  const [search, setSearch] = useUrlSyncedParam('search', '', 300);
  const [sortBy, setSortBy] = useUrlSyncedParam('sortBy', 'latest');
  const [category, setCategory] = useUrlSyncedParam('category', 'all');

  return (
    <>
      <TransactionFilterBar
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        onSortBy={setSortBy}
        category={category}
        onCategory={setCategory}
      />

      <TransactionList transactions={transactions} />
    </>
  );
}
