/* eslint-disable @next/next/no-img-element */
import { Transaction } from '@prisma/client';
import { formatDateToShortString } from '@/lib/utils';
import { AVATAR_DEFAULT } from '@/lib/constants';

import CardHeader from '@/components/ui/CardHeader';

function TransactionsCard({ transactions }: { transactions: Transaction[] }) {
  const MAX_DISPLAY = 5;
  const displayedTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_DISPLAY)
    .map((transaction) => ({
      ...transaction,
      date: formatDateToShortString(transaction.date),
    }));

  if (transactions.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">
          No transactions found
        </h2>
      </section>
    );
  }
  return (
    <section className="col-span-full flex flex-col justify-between rounded-lg bg-white p-8 shadow-sm">
      <CardHeader title="Transactions" href="/transactions" />
      <ul className="list-none space-y-1">
        {transactions.length > 0 &&
          displayedTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
      </ul>
    </section>
  );
}

function TransactionListItem({ transaction }: { transaction: Transaction }) {
  const { avatar, name, amount, date } = transaction;
  return (
    <li className="flex justify-between border-b border-gray-300 py-5 last:border-b-0">
      <div className="flex items-center gap-4">
        <img
          className="h-10 w-10 rounded-full"
          src={avatar || AVATAR_DEFAULT}
          alt={name}
          referrerPolicy="no-referrer"
        />
        <p className="text-preset-4-bold text-grey-900">{name}</p>
      </div>
      <div className="flex flex-col items-end justify-between gap-4">
        <p
          className={`text-preset-4-bold ${amount > 0 ? 'text-green' : 'text-grey-900'}`}
        >
          {amount > 0
            ? `+$${amount.toFixed(2)}`
            : `-$${Math.abs(amount).toFixed(2)}`}
        </p>
        <p className="text-preset-5 text-grey-500">{date}</p>
      </div>
    </li>
  );
}

export default TransactionsCard;
