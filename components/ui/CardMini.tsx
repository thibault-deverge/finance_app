type CardMiniType = {
  title: string;
  price: number;
  color: string;
};

function CardMini({ title, price, color }: CardMiniType) {
  return (
    <div
      className={`before:bg-${color} relative bg-white pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:rounded-full`}
    >
      <p className="text-preset-5 text-grey-500">{title}</p>
      <p className="text-preset-4-bold text-grey-900">${price}</p>
    </div>
  );
}

export default CardMini;
