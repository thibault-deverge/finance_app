'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';
import { useDebounce } from '@/hooks/useDebounce';

function TransactionsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rawSearch, setRawSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'latest');
  const [category, setCategory] = useState(
    searchParams.get('category') || 'all'
  );

  const debouncedSearch = useDebounce(rawSearch, 400);

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
    <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
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
    </section>
  );
}

export default TransactionsSection;
