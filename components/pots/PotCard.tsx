import EditDeletePots from './EditDeletePots';
import { Pot } from '@prisma/client';
import { Progress } from '@/components/ui/progress';

function PotCard({ pot }: { pot: Pot }) {
  const { name, theme, target, total } = pot;
  // console.log(pot);
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
        <Progress
          className="bg-beige-100 h-5 w-full rounded-md" // rounded-md équivaut à environ 4px
          value={percentage}
          indicatorColor={theme ?? '#f2cdac'}
          innerPadding={4}
        />
      </div>
    </li>
  );
}

export default PotCard;
