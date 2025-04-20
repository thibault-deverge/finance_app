type Budget = {
  category: string;
  maximum: number;
  theme: string;
};
function BudgetCard({ category }: Budget) {
  return <div>{category}</div>;
}

export default BudgetCard;
