import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardProps } from '@/lib/type';
import { Balance } from '@prisma/client';
import { formatAmount } from '@/lib/utils';

function OverviewCards({ balance }: { balance: Balance[] }) {
  return (
    <div className="col-span-full flex w-full flex-col justify-between gap-6 md:flex-row">
      <SummaryCard
        title="current"
        amount={balance[0].current}
        isFirstCard={true}
      />
      <SummaryCard
        title="income"
        amount={balance[0].income}
        isFirstCard={false}
      />
      <SummaryCard
        title="expenses"
        amount={balance[0].expenses}
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
