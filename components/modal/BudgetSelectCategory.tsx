'use client';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/utilsBudgets';

function BudgetSelectCategory({
  title,
  value,
  onChange,
  error,
}: {
  title: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const categoryAll = getAllCategories();

  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2">{title}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full px-5 py-5 hover:cursor-pointer ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
        >
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categoryAll.length > 0 &&
              categoryAll.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default BudgetSelectCategory;
