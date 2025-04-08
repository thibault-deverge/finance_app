type CardMiniType = {
  title: string;
  price: number;
  color: string;
};

const getBorderColorClass = (color: string) => {
  switch (color) {
    case 'green':
      return 'before:bg-green';
    case 'cyan':
      return 'before:bg-cyan';
    case 'navy':
      return 'before:bg-navy';
    case 'yellow':
      return 'before:bg-yellow';
    default:
      return 'before:bg-gray-500';
  }
};

function CardMini({ title, price, color }: CardMiniType) {
  return (
    <div
      className={`${getBorderColorClass(color)} relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full`}
    >
      <p className="text-preset-5 text-grey-500">{title}</p>
      <p className="text-preset-4-bold text-grey-900">${price}</p>
    </div>
  );
}

export default CardMini;
