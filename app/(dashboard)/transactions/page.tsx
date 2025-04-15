/* eslint-disable @next/next/no-img-element */
'use client';

import TransactionsSection from '@/components/transactions/TransactionSection';
import Title from '@/components/ui/Title';

export default function Page() {
  return (
    <section className="col-span-full flex h-screen flex-col gap-8 px-4 py-6 md:px-10 md:py-8 xl:col-span-1 xl:overflow-y-auto">
      <Title name="Transactions" />
      <TransactionsSection />
    </section>
  );
}
