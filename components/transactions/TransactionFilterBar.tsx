/* eslint-disable @next/next/no-img-element */
import FilterSelect from '@/components/transactions/FilterSelect';
import { categoriesOptions, sortByOptions } from '@/data/transactions';
import MobileSelectMenu from './MobileSelectMenu';

type TransactionFilterBarProps = {
  search: string;
  onSearch: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
};

function TransactionFilterBar({
  search,
  onSearch,
  sortBy,
  onSortByChange,
  category,
  onCategoryChange,
}: TransactionFilterBarProps) {
  return (
    <section className="flex items-center gap-6">
      {/* Search Bar */}
      <div className="relative max-w-[320px] min-w-[160px]">
        <input
          type="search"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="border-grey-500 text-preset-4 text-grey-500 hover:border-grey-900 focus:border-grey-900 w-full rounded-lg border-1 px-5 py-3 hover:cursor-pointer focus:ring-0 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        <img
          src="/images/icons/icon-search.svg"
          alt="search"
          className="absolute top-1/2 right-5 -translate-y-1/2"
        />
      </div>

      {/* Sort */}
      <div className="ml-auto flex items-center">
        {/* Mobile: icons */}
        <MobileSelectMenu
          iconSrc="/images/icons/icon-sort-mobile.svg"
          alt="sort"
          value={sortBy}
          onChange={onSortByChange}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
        />

        {/* Desktop : Select */}
        <FilterSelect
          label="Sort by"
          placeholder="Latest"
          value={sortBy}
          onChange={onSortByChange}
          options={sortByOptions}
        />
      </div>

      <div>
        {/* Mobile: icons */}
        <button className="flex items-center md:hidden">
          <img
            src="/images/icons/icon-filter-mobile.svg"
            alt="filter"
            className="h-4 w-4"
          />
        </button>

        {/* Desktop : Select */}
        <FilterSelect
          label="Category"
          placeholder="All Transactions"
          value={category}
          onChange={onCategoryChange}
          options={categoriesOptions}
        />
      </div>
    </section>
  );
}

export default TransactionFilterBar;
