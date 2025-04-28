/* eslint-disable @next/next/no-img-element */

type Props = {
  isFirstPage: boolean;
  onClick: () => void;
};

function PrevButton({ isFirstPage, onClick }: Props) {
  return (
    <button
      disabled={isFirstPage}
      aria-label="Go to previous page"
      className="hover:bg-beige-500 border-beige-500 flex cursor-pointer items-center gap-4 rounded-lg border-1 px-4 py-3 hover:text-white disabled:cursor-not-allowed"
      onClick={onClick}
    >
      <img
        src="/images/icons/icon-caret-left.svg"
        alt="previous arrow"
        className="h-3 w-3"
      />
      <span className="text-preset-4 hidden md:block">Prev</span>
    </button>
  );
}

export default PrevButton;
