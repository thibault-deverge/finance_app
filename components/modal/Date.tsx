'use client';

import { useFormContext } from '@/components/modal/Window';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function DateField({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('date', e.target.value);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="date" className="text-preset-5-bold text-grey-500 mb-2">
        {title}
      </Label>
      <Input
        id="date"
        name="date"
        type="date"
        value={formData.date || ''}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
}
