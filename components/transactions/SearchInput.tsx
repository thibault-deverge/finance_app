/* eslint-disable @next/next/no-img-element */
'use client';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className = '',
}: Props) {
  return (
    <div className={`relative max-w-[320px] min-w-[160px] ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="border-grey-500 text-preset-4 text-grey-500 hover:border-grey-900 focus:border-grey-900 w-full rounded-lg border-1 px-5 py-3 hover:cursor-pointer focus:ring-0 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      <img
        src="/images/icons/icon-search.svg"
        alt="search"
        className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2"
      />
    </div>
  );
}
