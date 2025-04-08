import { v4 as uuidv4 } from 'uuid';
import { formatDateToShortString } from '@/lib/utils';
import CardHeader from '../ui/CardHeader';
import data from '../../data/data.json';

const MAX_DISPLAY = 5;

type TransactionItemType = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  id: string;
};
const { transactions: allTransactions } = data;

const displayedTransactions = allTransactions
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, MAX_DISPLAY)
  .map((transaction) => ({
    ...transaction,
    date: formatDateToShortString(transaction.date),
    id: uuidv4(),
  }));

function TransactionsCard() {
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <CardHeader title="Transactions" href="/transactions" />
      <ul className="list-none space-y-1">
        {allTransactions &&
          displayedTransactions.map((transaction) => (
            <TransactionListItem entry={transaction} key={transaction.id} />
          ))}
      </ul>
    </section>
  );
}

function TransactionListItem({ entry }: { entry: TransactionItemType }) {
  return (
    <li className="flex justify-between border-b border-gray-300 py-5 last:border-b-0">
      <div className="flex items-center gap-4">
        <img
          className="h-10 rounded-full"
          src={entry.avatar}
          alt={entry.name}
          referrerPolicy="no-referrer"
        />
        <p className="text-preset-4-bold text-grey-900">{entry.name}</p>
      </div>
      <div className="flex flex-col items-end justify-between gap-4">
        <p
          className={`text-preset-4-bold ${entry.amount > 0 ? 'text-green' : 'text-grey-900'}`}
        >
          ${entry.amount}
        </p>
        <p className="text-preset-5 text-grey-500">{entry.date}</p>
      </div>
    </li>
  );
}

export default TransactionsCard;
