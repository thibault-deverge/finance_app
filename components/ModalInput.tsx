'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
interface HandleBlurEvent {
  target: {
    value: string;
  };
}

function ModalInput({ title }: { title: string }) {
  const [value, setValue] = useState(0);

  const handleBlur = (e: HandleBlurEvent): void => {
    const newValue = Number(e.target.value);
    setValue(newValue);
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
        placeholder="Amount"
        min={0}
        max={10000}
        onBlur={handleBlur}
      >
        $
      </Input>
    </div>
  );
}

export default ModalInput;
