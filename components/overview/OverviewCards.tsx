import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAmount } from '@/lib/utils';
import { Balance } from '@prisma/client';

export type CardProps = {
  title: string;
  amount: number;
  isFirstCard: boolean;
};
export type TitleProps = {
  name: string;
};

function OverviewCards({ balance }: { balance: Balance[] }) {
  return (
    <div className="col-span-full flex w-full flex-col justify-between gap-6 md:flex-row">
      <SummaryCard
        title="Current"
        amount={balance[0]?.current || 0}
        isFirstCard={true}
      />
      <SummaryCard
        title="Income"
        amount={balance[0]?.income || 0}
        isFirstCard={false}
      />
      <SummaryCard
        title="Expenses"
        amount={balance[0]?.expenses || 0}
        isFirstCard={false}
      />
    </div>
  );
}

function SummaryCard({ title, amount, isFirstCard }: CardProps) {
  const displayAmount = formatAmount(amount);
  return (
    <Card
      className={`flex-1 ${isFirstCard ? 'bg-grey-900 text-white' : 'text-grey-900 border-0 bg-white'}`}
    >
      <CardHeader>
        <CardTitle
          className={`text-preset-4 ${isFirstCard ? 'text-white' : 'text-grey-500'} `}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-preset-1">${displayAmount}</CardContent>
    </Card>
  );
}
export default OverviewCards;
