import { Transaction } from '@prisma/client';
import { formatAmount } from '@/lib/utils';

type Props = {
  transactions: Transaction[];
};

function SummaryBillsCard({ transactions }: Props) {
  const now = new Date();
  const oneWeekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1) Calculez la "dueDate" pour le mois en cours
  const withDue = transactions.map((tx) => {
    const day = new Date(tx.date).getUTCDate();
    const due = new Date(now.getFullYear(), now.getMonth(), day);
    return { ...tx, due };
  });

  // 2) Classez-en trois catégories
  const paid = withDue.filter(({ due }) => due < now);
  const upcoming = withDue.filter(({ due }) => due >= now);
  const dueSoon = upcoming.filter(({ due }) => due < oneWeekLater);

  // 3) Calculez compte et somme (valeurs absolues)
  const paidCount = paid.length;
  const paidSum = paid.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  const upcomingCount = upcoming.length;
  const upcomingSum = upcoming.reduce(
    (acc, tx) => acc + Math.abs(tx.amount),
    0
  );
  const dueSoonCount = dueSoon.length;
  const dueSoonSum = dueSoon.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);

  return (
    <section className="flex flex-grow flex-col gap-5 rounded-xl bg-white p-5 xl:flex-grow-0">
      <h2 className="text-preset-3 text-grey-900">Summary</h2>
      <div>
        {/* Paid Bills */}
        <div className="text-preset-5 text-grey-500 flex justify-between border-b border-gray-100 pb-4">
          <span>Paid Bills</span>
          <span className="text-preset-5-bold text-grey-900">
            {paidCount} (${formatAmount(paidSum)})
          </span>
        </div>

        {/* Total Upcoming */}
        <div className="text-preset-5 text-grey-500 flex justify-between border-b border-gray-100 py-4">
          <span>Total Upcoming Bills</span>
          <span className="text-preset-5-bold text-grey-900">
            {upcomingCount} (${formatAmount(upcomingSum)})
          </span>
        </div>

        {/* Due Soon */}
        <div className="text-red text-preset-5 flex justify-between pt-4">
          <span>Due Soon</span>
          <span className="text-preset-5-bold">
            {dueSoonCount} (${formatAmount(dueSoonSum)})
          </span>
        </div>
      </div>
    </section>
  );
}

export default SummaryBillsCard;
