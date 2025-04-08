type CardMiniType = {
  title: string;
  amount: number;
  color: string;
};
const CardMini = ({ title, amount, color }: CardMiniType) => {
  const colorStyle = color.startsWith('#') ? color : color;

  return (
    <div className="relative mb-2 rounded bg-white py-2 pl-4 shadow-sm">
      <div
        className="absolute top-0 left-0 h-full w-1 rounded-full"
        style={{ backgroundColor: colorStyle }}
      />

      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-bold text-gray-900">${amount}</p>
    </div>
  );
};

export default CardMini;
