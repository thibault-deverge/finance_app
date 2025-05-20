import Title from '@/components/ui/Title';
import AddPot from '@/components/pots/AddPot';
import PotList from '@/components/pots/PotList';
import { Pot } from '@prisma/client';

function Pots({ pots }: { pots: Pot[] }) {
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
