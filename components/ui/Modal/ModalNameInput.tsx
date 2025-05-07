'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function ModalNameInput({
  title,
  value,
  onChange,
  maxLength = 30,
}: {
  title: string;
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Limiter la saisie à maxLength caractères
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col">
      <Label className="text-preset-5-bold text-grey-500 mb-2" htmlFor="name">
        {title}
      </Label>
      <Input
        className="no-spinner items-center px-8 py-2.25"
        type="string"
        id="name"
        placeholder="e.g.2000"
        value={value}
        onChange={handleInputChange}
        maxLength={maxLength}
      >
        $
      </Input>
      <p className="mt-1 self-end text-sm text-gray-500">
        {value.length} of {maxLength} characters used
      </p>
    </div>
  );
}

export default ModalNameInput;
