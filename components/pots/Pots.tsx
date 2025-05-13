import Title from '@/components/ui/Title';
import AddPot from './AddPot';
import PotList from './PotList';
import { Pot } from '@prisma/client';

function Pots({ pots }: { pots: Pot[] }) {
  if (pots.length === 0) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">No pots found</h2>
      </section>
    );
  }
  return (
    <section className="col-span-full h-screen px-4 py-6 md:p-10 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <header className="mb-8.5 flex items-center justify-between">
        <Title name="Pots" />
        <AddPot />
      </header>
      <div className="grid grid-cols-1 gap-6">
        <PotList pots={pots} />
      </div>
    </section>
  );
}

export default Pots;
