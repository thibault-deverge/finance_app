import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getAllCategories } from '@/lib/utilsBudgets';

function ModalSelectCategory({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const categoryAll = getAllCategories();
  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2">{title}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full px-5 py-5 hover:cursor-pointer">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categoryAll.length > 0 &&
              categoryAll.map((category) => (
                <SelectItem
                  key={category}
                  value={
                    category.charAt(0).toLocaleLowerCase() + category.slice(1)
                  }
                >
                  {category}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModalSelectCategory;
