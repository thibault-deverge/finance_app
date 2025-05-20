import { Pot } from '@prisma/client';
import PotCard from '@/components/pots/PotCard';

function PotList({ pots }: { pots: Pot[] }) {
  if (pots.length === 0) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">No pots found</h2>
      </section>
    );
  }
  return (
    <ul className="grid-cols grid gap-6 xl:grid-cols-2">
      {pots.map((pot) => (
        <PotCard key={pot.id} pot={pot} />
      ))}
    </ul>
  );
}

export default PotList;
