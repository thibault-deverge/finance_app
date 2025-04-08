import Link from 'next/link';

function PotsCard() {
  return (
    <div className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <div>
        <header className="mb-5 flex justify-between">
          <h2 className="text-preset-2 text-grey-900">Pots</h2>
          <Link href="/pots" className="flex items-center gap-3">
            <p className="text-preset-4">See Details</p>
            <img
              src="/images/icons/icon-caret-right.svg"
              alt="icon carret right"
            />
          </Link>
        </header>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="bg-beige-100 flex items-center justify-start gap-3 rounded-xl py-5 pr-22 pl-4">
          <div className="flex flex-shrink-0 items-center justify-center">
            <img
              src="/images/icons/icon-pot.svg"
              alt="icon pot"
              className="h-10 w-10"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">$850</p>
          </div>
        </div>
        <div className="grid w-full max-w-[340px] grid-cols-2 gap-4">
          <div className="before:bg-green relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full">
            <p className="text-preset-5 text-gray-500">Savings</p>
            <p className="text-preset-4-bold text-grey-900">$159</p>
          </div>
          <div className="before:bg-cyan relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full">
            <p className="text-preset-5 text-gray-500">Gifts</p>
            <p className="text-preset-4-bold text-grey-900">$40</p>
          </div>
          <div className="before:bg-navy relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full">
            <p className="text-preset-5 text-gray-500">Concert Ticket</p>
            <p className="text-preset-4-bold text-grey-900">$110</p>
          </div>
          <div className="before:bg-yellow relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full">
            <p className="text-preset-5 text-gray-500">New Laptop</p>
            <p className="text-preset-4-bold text-grey-900">$10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PotsCard;
