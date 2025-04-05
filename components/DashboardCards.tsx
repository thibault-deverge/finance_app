import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAmount } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
type CardProps = {
  title: string;
  amount: number;
  isFirstCard: boolean;
};
const cardsInfo = [
  { id: uuidv4(), title: 'Current Balance', amount: 4836.0 },
  { id: uuidv4(), title: 'Income', amount: 3814.25 },
  { id: uuidv4(), title: 'Expenses', amount: 1700.5 },
];

function DashboardCards() {
  return (
    <div className="col-span-full flex w-full flex-col justify-between gap-6 sm:flex-row">
      {cardsInfo &&
        cardsInfo.map(({ id, title, amount }, index) => (
          <SummaryCard
            key={id}
            title={title}
            amount={amount}
            isFirstCard={index === 0}
          />
        ))}
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
export default DashboardCards;
