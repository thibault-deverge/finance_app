/* eslint-disable @next/next/no-img-element */
import { Transaction } from '@prisma/client';

type RecurringBillsListProps = {
  transactions: Transaction[];
};

function RecurringBillsList({ transactions }: RecurringBillsListProps) {
  return (
    <>
      <div className="md:hidden">
        {transactions.map((transaction) => {
          const { id, avatar, name, amount, date, category } = transaction;

          return (
            <div
              key={id}
              className="border-grey-100 flex flex-col gap-1 border-b py-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={avatar || '/image/avatar/avatar-default.png'}
                  alt={name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-preset-4-bold">{name}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-preset-5 text-green">Monthly-1st </span>
                  <img
                    src="/images/icons/icon-bill-due.svg"
                    alt="Bill due"
                    className="h-3 w-3 rounded-full"
                  />
                </div>
                <span className="text-preset-4-bold">$250.00</span>
              </div>
            </div>
          );
        })}
      </div>

      <table className="hidden md:table">
        <thead>
          <tr className="text-grey-500 text-preset-4 border-grey-100 border-b text-left">
            <th className="w-2/3 py-3">Bill Title</th>
            <th className="py-3">Due Date</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </>
  );
}

export default RecurringBillsList;
