type Budget = {
  category: string;
  maximum: number;
  theme: string;
};
function BudgetCard({ category, maximum, theme }: Budget) {
  console.log(theme);
  return (
    <li className="rounded-xl bg-white px-5 py-7">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: theme }}
            className={`h-4 w-4 rounded-full`}
          ></div>
          <h3 className="text-preset-2 text-grey-900">{category}</h3>
        </div>
        
      </div>
    </li>
  );
}

export default BudgetCard;
