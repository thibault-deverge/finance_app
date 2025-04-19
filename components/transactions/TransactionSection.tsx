'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';

function TransactionsSection() {
  const router = useRouter();
  const searchParams = new URLSearchParams();

  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'latest';
  const category = searchParams.get('category') || 'all';

  function updateQueryParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  }

  return (
    <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
      <TransactionFilterBar
        search={search}
        onSearch={(value) => updateQueryParams('search', value)}
        sortBy={sortBy}
        onSortBy={(value) => updateQueryParams('sortBy', value)}
        category={category}
        onCategory={(value) => updateQueryParams('category', value)}
      />
    </section>
  );
}

export default TransactionsSection;
