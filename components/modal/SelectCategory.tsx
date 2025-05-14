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

function SelectCategory({
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
      <div className="mb-2 flex items-start gap-1">
        <Label className="text-preset-5-bold text-grey-500">{title}</Label>
        <span className="leading-none text-red-500" aria-hidden="true">
          *
        </span>
      </div>
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

export default SelectCategory;
