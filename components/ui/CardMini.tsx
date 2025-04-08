type CardMiniType = {
  title: string;
  amount: number;
  color: string;
  bgColor?: string;
};
const CardMini = ({ title, amount, color, bgColor }: CardMiniType) => {
  const colorStyle = color.startsWith('#') ? color : color;

  return (
    <div
      className={`relative flex max-h-13 flex-col gap-2 rounded-lg pl-4 ${bgColor ? bgColor : 'bg-white'}`}
    >
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
