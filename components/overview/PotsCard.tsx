/* eslint-disable @next/next/no-img-element */
import CardHeader from '@/components/ui/CardHeader';
import CardMini from '@/components/ui/CardMini';
import { getTotalSaved } from '@/lib/utilsPots';
import { Pot } from '@prisma/client';

function PotsCard({ pots }: { pots: Pot[] }) {
  const MAX_DISPLAY = 4;
  const total = getTotalSaved(pots);
  const displayedPots = pots
    .sort((a, b) => b.total - a.total)
    .slice(0, MAX_DISPLAY);

  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8 shadow-sm">
      <CardHeader title="Pots" href="/pots" />

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="bg-beige-100 flex items-center justify-start gap-3 rounded-xl py-5 pr-22 pl-4">
          <div className="flex flex-shrink-0 items-center justify-center">
            <img
              src="/images/icons/icon-pot.svg"
              alt="icon pot"
              className="h-10 w-10"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">${total}</p>
          </div>
        </div>

        <div className="grid w-full max-w-[340px] grid-cols-2 gap-4">
          {displayedPots &&
            displayedPots.map((pot) => (
              <CardMini
                key={pot.id}
                title={pot.name}
                amount={pot.total}
                color={pot.theme ?? '#f8f4f0'}
                type="pots"
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default PotsCard;
