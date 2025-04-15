import Image from 'next/image';

function HeroPanel() {
  return (
    <section className="m-4 hidden h-[96%] max-w-[37.5rem] flex-col justify-between overflow-hidden rounded-xl bg-[url(/images/illustration-authentication.svg)] bg-cover bg-center bg-no-repeat lg:flex">
      <Image
        src={'/images/logo/logo-large.svg'}
        className="m-10"
        alt="Logo"
        width={122}
        height={22}
        quality={80}
        loading="lazy"
      />
      <div className="m-10 flex flex-col gap-6 text-white">
        <h1 className="text-preset-1 w-[90%]">
          Keep track of your money and save your future
        </h1>
        <p className="text-preset-4">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add savings pots easily.
        </p>
      </div>
    </section>
  );
}

export default HeroPanel;
