import { Pot } from '@prisma/client';

import { Progress } from '@/components/ui/progress';
import EditDeletePots from '@/components/pots/EditDeletePots';
import AddMoney from '@/components/pots/AddMoney';
import WithdrawMoney from '@/components/pots/WithdrawMoney';

function PotCard({ pot }: { pot: Pot }) {
  const { name, theme, target, total } = pot;
  const percentage = parseFloat(((total / target) * 100).toFixed(2));
  return (
    <li className="flex flex-col gap-5 rounded-xl bg-white px-5 py-7">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: theme ?? '#f2cdac' }}
              className={`h-4 w-4 rounded-full`}
            ></div>
            <h3 className="text-preset-2 text-grey-900">{name}</h3>
          </div>
          <EditDeletePots pot={pot} />
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-preset-4 text-grey-500">Total Saved</h4>
          <h5 className="text-preset-1 text-grey-900">
            ${Number(total).toFixed(2)}
          </h5>
        </div>
        <div className="flex flex-col gap-3">
          <Progress
            className="bg-beige-100 h-5 w-full rounded-md"
            value={percentage}
            indicatorColor={theme ?? '#f2cdac'}
            innerPadding={4}
          />
          <div className="flex justify-between">
            <p className="text-preset-5-bold text-grey-500">{percentage}%</p>
            <p className="text-preset-5 text-grey-500">Target of ${target}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <AddMoney pot={pot} />
          <WithdrawMoney pot={pot} />
        </div>
      </div>
    </li>
  );
}

export default PotCard;
