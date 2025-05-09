/* eslint-disable @next/next/no-img-element */
import { RecurringBillView } from '@/components/recurring/type';

type Props = {
  bill: RecurringBillView;
};

function RecurringBillsMobileRow({ bill }: Props) {
  return (
    <div className="border-grey-100 flex flex-col gap-1 border-b py-5">
      <div className="flex items-center gap-4">
        <img
          src={bill.avatar}
          alt={bill.name}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-preset-4-bold">{bill.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-preset-5 text-green">{bill.label}</span>
          {bill.iconSrc && (
            <img
              src={bill.iconSrc}
              alt={bill.altText}
              className="h-3 w-3 rounded-full"
            />
          )}
        </div>
        <span className="text-preset-4-bold">{bill.amount}</span>
      </div>
    </div>
  );
}

export default RecurringBillsMobileRow;
