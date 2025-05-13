/* eslint-disable @next/next/no-img-element */
import { formatAmountSign, formatDateToShortString } from '@/lib/utils';
import { AVATAR_DEFAULT } from '@/lib/constants';

import EditDeleteTransaction from '@/components/transactions/EditDeleteTransaction';
import { Transaction } from '@prisma/client';

type Props = {
  transaction: Transaction;
};

function TransactionDesktopRow({ transaction }: Props) {
  const { avatar, name, category, amount, date } = transaction;
  const amountColor = amount < 0 ? '' : 'text-green';

  return (
    <tr className="border-grey-100 text-preset-4 [&:not(:last-child)]:border-b">
      <td className="flex items-center gap-4 py-8">
        <img
          src={avatar || AVATAR_DEFAULT}
          alt={`Avatar of ${name}`}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-preset-4-bold">{name}</span>
      </td>

      <td>
        <span className="text-preset-5 text-grey-500">{category}</span>
      </td>

      <td className="text-preset-5 text-grey-500">
        {formatDateToShortString(date)}
      </td>

      <td className={`text-preset-4-bold text-right ${amountColor}`}>
        {formatAmountSign(amount)}
      </td>

      <td className="text-right">
        <EditDeleteTransaction transaction={transaction} />
      </td>
    </tr>
  );
}

export default TransactionDesktopRow;
