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

function ModalSelectCategory({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
 
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
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="dining out">Dining Out</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="personal care">Personal Care</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModalSelectCategory;
