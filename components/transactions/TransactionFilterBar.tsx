import { categoriesOptions, sortByOptions } from '@/data/transactions';

import SearchInput from '@/components/filters/SearchInput';
import FilterControls from '@/components/filters/FilterControls';

type TransactionFilterBarProps = {
  search: string;
  onSearch: (value: string) => void;
  sortBy: string;
  onSortBy: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
};

function TransactionFilterBar({
  search,
  onSearch,
  sortBy,
  onSortBy,
  category,
  onCategory,
}: TransactionFilterBarProps) {
  return (
    <section className="flex items-center gap-6">
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Search transactions"
      />

      <FilterControls
        icon="sort-mobile"
        label="Sort by"
        value={sortBy}
        onChange={onSortBy}
        options={sortByOptions}
        className="ml-auto"
      />

      <FilterControls
        icon="filter-mobile"
        label="Category"
        value={category}
        onChange={onCategory}
        options={categoriesOptions}
      />
    </section>
  );
}

export default TransactionFilterBar;
