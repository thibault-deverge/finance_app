import React from 'react';
import { Transaction } from '@prisma/client';

import TransactionMobileRow from '@/components/transactions/TransactionMobileRow';
import TransactionDesktopRow from '@/components/transactions/TransactionDesktopRow';
import { Separator } from '@/components/ui/separator';

type Props = {
  transactions: Transaction[];
};

function TransactionList({ transactions }: Props) {
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col md:hidden">
        {transactions.map((transaction, idx) => (
          <React.Fragment key={transaction.id}>
            <TransactionMobileRow transaction={transaction} />
            {idx !== transactions.length - 1 && (
              <Separator className="b-2 bg-grey-100" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop and tablet */}
      <table className="mx-8 my-6 hidden md:table">
        <thead>
          <tr className="text-grey-500 text-preset-4 border-grey-100 border-b text-left">
            <th className="py-8">Recipient / Sender</th>
            <th className="py-8">Category</th>
            <th className="py-8">Date</th>
            <th className="py-8 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <TransactionDesktopRow
                key={transaction.id}
                transaction={transaction}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TransactionList;
