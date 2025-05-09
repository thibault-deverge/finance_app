/* eslint-disable @next/next/no-img-element */
import { formatAmount } from '@/lib/utils';

type Props = {
  totalAmount: number;
};

function TotalBillsCard({ totalAmount }: Props) {
  return (
    <section className="bg-grey-900 flex flex-grow items-center gap-5 rounded-xl px-5 py-6 text-white md:flex-col md:items-start md:justify-end md:gap-8 md:px-6 xl:flex-grow-0">
      <img
        src="/images/icons/icon-recurring-bills.svg"
        alt="Recurring Bills"
        className="h-7 w-8"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-preset-4">Total bills</h2>
        <span className="text-preset-1">${formatAmount(totalAmount)}</span>
      </div>
    </section>
  );
}

export default TotalBillsCard;
