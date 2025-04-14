'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type FilterSelectProps = {
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({
  label,
  options,
  placeholder,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <span className="text-preset-4 min-w-fit text-gray-500">{label}</span>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-grey-500 text-preset-4 px-5 py-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-none bg-white">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSelect;
