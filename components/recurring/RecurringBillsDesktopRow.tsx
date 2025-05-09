/* eslint-disable @next/next/no-img-element */
import { RecurringBillView } from '@/components/recurring/type';

type Props = {
  bill: RecurringBillView;
};

function RecurringBillsDesktopRow({ bill }: Props) {
  return (
    <tr className="border-grey-100 text-preset-4 [&:not(:last-child)]:border-b">
      <td className="flex items-center gap-4 py-6">
        <img
          src={bill.avatar}
          alt={bill.name}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-preset-4-bold">{bill.name}</span>
      </td>

      <td className="py-6">
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
      </td>

      <td className="py-6 text-right">
        <span className="text-preset-4-bold">{bill.amount}</span>
      </td>
    </tr>
  );
}

export default RecurringBillsDesktopRow;
