import Title from '@/components/ui/Title';
import AddPot from './AddPot';
import PotList from './PotList';
import { Pot } from '@prisma/client';

function Pots({ pots }: { pots: Pot[] }) {
  return (
    <section className="col-span-full h-screen px-4 py-6 xl:col-span-1 xl:h-screen xl:overflow-y-auto">
      <header className="mb-8.5 flex items-center justify-between">
        <Title name="Pots" />
        <AddPot pots={pots} />
      </header>
      <div className="grid grid-cols-1 gap-6">
        <PotList pots={pots} />
      </div>
    </section>
  );
}
/*
 {
    id: 'cm9o95ikw001fzyz3rgzgsbkr',
    name: 'Gift',
    target: 150,
    total: 110,
    theme: '#82C9D7',
    userId: 'cm9o95j04001izyz3kszpqj4c',
    createdAt: 2025-04-19T13:26:53.264Z,
    updatedAt: 2025-04-19T13:26:53.264Z
  },
*/
export default Pots;
