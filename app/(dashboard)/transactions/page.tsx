/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import Title from '@/components/ui/Title';
import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';

export default function Page() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [category, setCategory] = useState('all');

  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Transactions" />

      <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
        <TransactionFilterBar
          search={search}
          onSearch={setSearch}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          category={category}
          onCategoryChange={setCategory}
        />
      </section>
    </section>
  );
}
