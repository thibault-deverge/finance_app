import CardHeader from '../ui/CardHeader';
import CardMini from '../ui/CardMini';

function PotsCard() {
  return (
    <section className="col-span-full flex flex-col justify-between gap-6 rounded-lg bg-white p-8">
      <div>
        <CardHeader title="Pots" href="/pots" />
      </div>
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
            <p className="text-preset-1 text-grey-900">$850</p>
          </div>
        </div>

        <div className="grid w-full max-w-[340px] grid-cols-2 gap-4">
          <CardMini title="Savings" price={159} color="green" />
          <CardMini title="Gifts" price={40} color="cyan" />
          <CardMini title="Concert Ticket" price={110} color="navy" />
          <CardMini title="New Laptop" price={10} color="yellow" />
        </div>
      </div>
    </section>
  );
}

export default PotsCard;
