'use client';
import { Transaction } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';
import TransactionList from '@/components/transactions/TransactionList';

type TransactionsSectionProps = {
  transactions: Transaction[];
};

function TransactionsSection({ transactions }: TransactionsSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rawSearch, setRawSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'latest');
  const [category, setCategory] = useState(
    searchParams.get('category') || 'all'
  );

  const debouncedSearch = useDebounce(rawSearch);

  useEffect(() => {
    const current = searchParams.get('search') || '';
    if (debouncedSearch !== current) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`);
    }
  }, [debouncedSearch, router, searchParams]);

  function updateQueryParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <TransactionFilterBar
        search={rawSearch}
        onSearch={setRawSearch}
        sortBy={sortBy}
        onSortBy={(val) => {
          setSortBy(val);
          updateQueryParams('sortBy', val);
        }}
        category={category}
        onCategory={(val) => {
          setCategory(val);
          updateQueryParams('category', val);
        }}
      />

      <TransactionList transactions={transactions} />
    </>
  );
}

export default TransactionsSection;
