'use client';
import { Transaction } from '@prisma/client';
import { sortByOptions } from '@/data/transactions';

import SearchInput from '@/components/filters/SearchInput';
import FilterControls from '@/components/filters/FilterControls';
import RecurringBillsList from './RecurringBillsList';
import { useUrlSyncedParam } from '@/hooks/useUrlSyncedParam';
import { mapToRecurringBillView } from './utils';
import { useSortedBills } from '@/hooks/useSortedBills';

type RecurringBillsProps = {
  transactions: Transaction[];
};

function RecurringBillsSection({ transactions }: RecurringBillsProps) {
  const [search, setSearch] = useUrlSyncedParam('search', '', 300);
  const [sortBy, setSortBy] = useUrlSyncedParam('sortBy', 'latest');
  const sortedTxs = useSortedBills(transactions, sortBy);
  const bills = sortedTxs.map(mapToRecurringBillView);

  const filteredBills = bills.filter((tx) =>
    tx.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8 xl:flex-grow">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search bills"
            className="flex-grow"
          />
          <FilterControls
            icon="sort-mobile"
            label="Sort by"
            value={sortBy}
            onChange={setSortBy}
            options={sortByOptions}
            className="ml-auto"
          />
        </div>

        {transactions.length === 0 ? (
          <section className="flex h-screen flex-col items-center justify-center gap-6 bg-white px-5 py-6 md:px-8 md:py-8 xl:flex-grow">
            <h2 className="text-xl font-semibold text-gray-800">
              No recurring bills found
            </h2>
          </section>
        ) : (
          <RecurringBillsList bills={filteredBills} />
        )}
      </div>
    </section>
  );
}

export default RecurringBillsSection;
