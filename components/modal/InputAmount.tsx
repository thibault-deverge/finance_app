'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputAmountProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  name: string;
  min?: number;
  max?: number;
  error?: string;
}
function InputAmount({
  title,
  name,
  value,
  min = 0,
  max = 10000,
  error,
  onChange,
}: InputAmountProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(newValue);
  };
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-start gap-1">
        <Label
          className="text-preset-5-bold text-grey-500 mb-2"
          htmlFor="number"
        >
          {title}
        </Label>
        <span className="leading-none text-red-500" aria-hidden="true">
          *
        </span>
      </div>

      <Input
        className={`no-spinner items-center px-8 py-2.25 ${
          error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
        }`}
        type="number"
        id="number"
        placeholder={
          name === 'budget'
            ? 'Amount'
            : name === 'addMoneyPot'
              ? '0'
              : 'e.g. 2000'
        }
        min={min}
        max={max}
        value={value === 0 ? '' : value}
        onChange={handleInputChange}
        required
      >
        $
      </Input>
    </div>
  );
}

export default InputAmount;
