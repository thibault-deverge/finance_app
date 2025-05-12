/* eslint-disable @next/next/no-img-element */
import { Transaction } from '@prisma/client';
import { formatAmountSign, formatDateToShortString } from '@/lib/utils';
import { AVATAR_DEFAULT } from '@/lib/constants';

import EditDeleteTransaction from '@/components/transactions/EditDeleteTransaction';

type Props = {
  transaction: Transaction;
};

function TransactionMobileRow({ transaction }: Props) {
  const { avatar, name, category, amount, date } = transaction;
  const amountColor = amount < 0 ? '' : 'text-green';

  return (
    <>
      <div className="my-4 flex items-center gap-3">
        <div>
          <img
            src={avatar || AVATAR_DEFAULT}
            alt={`avatar of ${name}`}
            className="h-8 w-8 rounded-full"
          />
        </div>

        <div className="flex flex-col justify-between gap-1">
          <span className="text-preset-4-bold">{name}</span>
          <span className="text-preset-5 text-grey-500">{category}</span>
        </div>

        <div className="ml-auto flex flex-col justify-between gap-1 text-right">
          <span className={`text-preset-4-bold ${amountColor}`}>
            {formatAmountSign(amount)}
          </span>
          <span className="text-preset-5 text-grey-500">
            {formatDateToShortString(date)}
          </span>
        </div>

        <div>
          <EditDeleteTransaction transaction={transaction} />
        </div>
      </div>
    </>
  );
}

export default TransactionMobileRow;
