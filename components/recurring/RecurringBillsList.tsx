import RecurringBillsMobileRow from './RecurringBillsMobileRow';
import RecurringBillsDesktopRow from './RecurringBillsDesktopRow';
import { RecurringBillView } from './type';

type RecurringBillsListProps = {
  bills: RecurringBillView[];
};

function RecurringBillsList({ bills }: RecurringBillsListProps) {
  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {bills.map((bill) => {
          return <RecurringBillsMobileRow key={bill.id} bill={bill} />;
        })}
      </div>

      {/* Desktop view */}
      <table className="hidden md:table">
        <thead>
          <tr className="text-grey-500 text-preset-4 border-grey-100 border-b text-left">
            <th className="w-2/3 py-3">Bill Title</th>
            <th className="py-3">Due Date</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => {
            return <RecurringBillsDesktopRow key={bill.id} bill={bill} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export default RecurringBillsList;
