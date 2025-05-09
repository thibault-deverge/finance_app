import Link from 'next/link';

type CardHeaderType = {
  title: string;
  href: string;
};
function CardHeader({ title, href }: CardHeaderType) {
  return (
    <header className="mb-5 flex justify-between">
      <h2 className="text-preset-2 text-grey-900">{title}</h2>
      <Link href={href} className="flex items-center gap-3">
        <p className="text-preset-4">
          {title === 'Transactions' ? 'View all' : 'See Details'}
        </p>
        <img src="/images/icons/icon-caret-right.svg" alt="icon carret right" />
      </Link>
    </header>
  );
}

export default CardHeader;
