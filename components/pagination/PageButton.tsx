type Props = {
  page: number;
  isActive: boolean;
  onClick: () => void;
};

function PageButton({ page, isActive, onClick }: Props) {
  return (
    <button
      disabled={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={`text-preset-4 border-grey-500 hover:bg-grey-500 h-10 w-10 cursor-pointer rounded-lg border-1 transition-colors hover:text-white ${isActive && 'bg-grey-900 text-white'}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
}

export default PageButton;
