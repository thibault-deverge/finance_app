'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function InputAmount({
  title,
  name,
  value,

  onChange,
}: {
  title: string;
  name: string;

  value: number | string;
  onChange: (value: number) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(newValue);
  };
  return (
    <div className="mb-4">
      <Label className="text-preset-5-bold text-grey-500 mb-2" htmlFor="number">
        {title}
      </Label>
      <Input
        className="no-spinner items-center px-8 py-2.25"
        type="number"
        id="number"
        placeholder={
          name === 'budget'
            ? 'Amount'
            : name === 'addMoneyPot'
              ? '0'
              : 'e.g. 2000'
        }
        min={0}
        max={10000}
        value={value === 0 ? '' : value}
        onChange={handleInputChange}
      >
        $
      </Input>
    </div>
  );
}

export default InputAmount;
