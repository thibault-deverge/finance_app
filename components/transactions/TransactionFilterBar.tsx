/* eslint-disable @next/next/no-img-element */
import FilterSelect from '@/components/transactions/FilterSelect';
import { categoriesOptions, sortByOptions } from '@/data/transactions';
import MobileSelectMenu from '@/components/transactions/MobileSelectMenu';
import SearchInput from '@/components/transactions/SearchInput';

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
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Search transactions"
      />

      {/* Sort */}
      <div className="ml-auto flex items-center">
        {/* Mobile: icons */}
        <MobileSelectMenu
          iconSrc="/images/icons/icon-sort-mobile.svg"
          alt="sort by"
          label="Sort by"
          value={sortBy}
          onChange={onSortByChange}
          options={sortByOptions}
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
        <MobileSelectMenu
          iconSrc="/images/icons/icon-filter-mobile.svg"
          alt="filter by category"
          label="Category"
          value={category}
          onChange={onCategoryChange}
          options={categoriesOptions}
        />

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
