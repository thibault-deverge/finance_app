import CardHeader from '@/components/ui/CardHeader';
import CardMini from '@/components/ui/CardMini';
import { formatAmount } from '@/lib/utils';
import { Transaction } from '@prisma/client';

function RecurringBills({ transactions }: { transactions: Transaction[] }) {
  const recurringTransactions = transactions.filter((tx) => tx.recurring);

  if (recurringTransactions.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">
          No recurring bills found
        </h2>
      </section>
    );
  }
  const now = new Date();
  const oneWeekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1) Calculez la "dueDate" pour le mois en cours
  const withDue = recurringTransactions.map((tx) => {
    const day = new Date(tx.date).getUTCDate();
    const due = new Date(now.getFullYear(), now.getMonth(), day);
    return { ...tx, due };
  });

  // 2) Classez-en trois catégories
  const paid = withDue.filter(({ due }) => due < now);
  const upcoming = withDue.filter(({ due }) => due >= now);
  const dueSoon = upcoming.filter(({ due }) => due < oneWeekLater);

  // 3) Calculez compte et somme (valeurs absolues)
  const paidSum = paid.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  const upcomingSum = upcoming.reduce(
    (acc, tx) => acc + Math.abs(tx.amount),
    0
  );
  const dueSoonSum = dueSoon.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);

  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8 shadow-sm">
      <CardHeader title="Recurring Bills" href="/recurring-bills" />

      <CardMini
        title="Paid Bills"
        amount={formatAmount(paidSum)}
        color="#277C78"
        type="recurringBills"
      />
      <CardMini
        title="Total Upcoming"
        amount={formatAmount(upcomingSum)}
        color="#F2CDAC"
        type="recurringBills"
      />
      <CardMini
        title="Due Soon"
        amount={formatAmount(dueSoonSum)}
        color="#82C9D7"
        type="recurringBills"
      />
    </section>
  );
}

export default RecurringBills;
