'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Transaction } from '@prisma/client';
import { useDebounce } from '@/hooks/useDebounce';
import { sortByOptions } from '@/data/transactions';

import SearchInput from '@/components/filters/SearchInput';
import FilterControls from '@/components/filters/FilterControls';
import RecurringBillsList from './RecurringBillsList';

type RecurringBillProps = {
  transactions: Transaction[];
};

function RecurringBillSection({ transactions }: RecurringBillProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rawSearch, setRawSearch] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'latest');
  const debouncedSearch = useDebounce(rawSearch);

  useEffect(() => {
    const current = searchParams.get('search');
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

  const onSortBy = (value: string) => {
    setSortBy(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <SearchInput
          value={rawSearch}
          onChange={setRawSearch}
          placeholder="Search bills"
          className="flex-grow"
        />

        <FilterControls
          icon="sort-mobile"
          label="Sort by"
          value={sortBy}
          onChange={onSortBy}
          options={sortByOptions}
          className="ml-auto"
        />
      </div>

      <RecurringBillsList transactions={transactions} />
    </div>
  );
}

export default RecurringBillSection;
