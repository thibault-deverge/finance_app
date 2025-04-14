/* eslint-disable @next/next/no-img-element */
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Title from '@/components/ui/Title';

export default function Page() {
  return (
    <main className="flex flex-col gap-8 px-4 py-6 md:px-10 md:py-8">
      <Title name="Transactions" />

      <section className="flex flex-col gap-6 bg-white px-5 py-6 md:px-8 md:py-8">
        <section className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative max-w-[320px] min-w-[160px]">
            <input
              type="search"
              placeholder="Search transactions"
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
            <button type="button" className="md:hidden">
              <img
                src="/images/icons/icon-sort-mobile.svg"
                alt="filter"
                className="h-4 w-4"
              />
            </button>

            {/* Desktop : Select */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-preset-4 min-w-fit text-gray-500">
                Sort by
              </span>
              <Select>
                <SelectTrigger className="border-grey-500 text-preset-4 px-5 py-3">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent className="border-none bg-white">
                  <SelectItem value="all">Latest</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-preset-4 min-w-fit text-gray-500">
                Category
              </span>
              <Select>
                <SelectTrigger className="border-grey-500 text-preset-4 px-5 py-3">
                  <SelectValue placeholder="All Transactions" />
                </SelectTrigger>
                <SelectContent className="border-none bg-white">
                  <SelectItem value="all">Entertainment</SelectItem>
                  <SelectItem value="income">Bills</SelectItem>
                  <SelectItem value="expense">Groceries</SelectItem>
                  <SelectItem value="expense">Dining Out</SelectItem>
                  <SelectItem value="expense">Transportation</SelectItem>
                  <SelectItem value="expense">Personal Care</SelectItem>
                  <SelectItem value="expense">Education</SelectItem>
                  <SelectItem value="expense">Lifestyle</SelectItem>
                  <SelectItem value="expense">Shopping</SelectItem>
                  <SelectItem value="expense">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
