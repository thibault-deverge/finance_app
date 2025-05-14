'use client';

import { useFormContext } from '@/components/modal/Window';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function DateField({ title }: { title: string }) {
  const { formData, updateFormData, errors } = useFormContext();
  const error = errors?.date;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('date', e.target.value);
  };

  return (
    <>
      <div className="mb-2 flex items-start gap-1">
        <Label htmlFor="date" className="text-preset-5-bold text-grey-500 mb-1">
          {title}
        </Label>
        <span className="leading-none text-red-500" aria-hidden="true">
          *
        </span>
      </div>

      <Input
        id="date"
        name="date"
        type="date"
        value={formData.date || ''}
        onChange={handleChange}
        className={`mb-4 w-full items-center px-4 py-2.25 ${error ? 'border-red-500 ring-1 ring-red-500' : ''}`}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}
