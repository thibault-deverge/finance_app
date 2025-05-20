/* eslint-disable @next/next/no-img-element */
import CardHeader from '@/components/ui/CardHeader';
import CardMini from '@/components/ui/CardMini';
import { MAX_DISPLAY_POTSCARD } from '@/lib/constants';
import { getTotalSaved } from '@/lib/utilsPots';
import { Pot } from '@prisma/client';

function PotsCard({ pots }: { pots: Pot[] }) {
  const total = getTotalSaved(pots);
  const displayedPots = pots
    .sort((a, b) => b.total - a.total)
    .slice(0, MAX_DISPLAY_POTSCARD);

  if (pots.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
        <h2 className="text-lg font-semibold text-gray-500">No pots found</h2>
      </section>
    );
  }
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
