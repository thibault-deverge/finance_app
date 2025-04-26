/* eslint-disable @next/next/no-img-element  */

type Props = {
  isLastPage: boolean;
  onClick: () => void;
};

function NextButton({ isLastPage, onClick }: Props) {
  return (
    <button
      disabled={isLastPage}
      aria-label="Go to next page"
      className="hover:bg-beige-500 border-beige-500 flex cursor-pointer items-center gap-4 rounded-lg border-1 px-4 py-3 transition-colors hover:text-white disabled:cursor-not-allowed"
      onClick={onClick}
    >
      <span className="text-preset-4 hidden md:block">Next</span>
      <img
        src="/images/icons/icon-caret-right.svg"
        alt="next arrow"
        className="h-3 w-3"
      />
    </button>
  );
}

export default NextButton;
