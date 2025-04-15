'use client';
import { useState } from 'react';

import TransactionFilterBar from '@/components/transactions/TransactionFilterBar';

function TransactionsSection() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [category, setCategory] = useState('all');

  return (
    <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
      <TransactionFilterBar
        search={search}
        onSearch={setSearch}
        sortBy={sortBy}
        onSortBy={setSortBy}
        category={category}
        onCategory={setCategory}
      />
    </section>
  );
}

export default TransactionsSection;
