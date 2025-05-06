import { Pot } from '@prisma/client';
import PotCard from './PotCard';

function PotList({ pots }: { pots: Pot[] }) {
  return pots.length > 0 ? (
    <ul className="grid-cols grid gap-6 xl:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot.id} pot={pot} />
      ))}
    </ul>
  ) : (
    <p>No Pots</p>
  );
}

export default PotList;
