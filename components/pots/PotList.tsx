import { Pot } from '@prisma/client';
import PotCard from './PotCard';

function PotList({ pots }: { pots: Pot[] }) {
  return (
    <ul className="grid-cols grid gap-6 xl:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot.id} pot={pot} />
      ))}
    </ul>
  );
}

export default PotList;
