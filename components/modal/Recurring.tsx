'use client';

import { useFormContext } from '@/components/modal/Window';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function RecurringCheckbox({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();
  const checked = Boolean(formData.recurring);

  const handleChange = (checked: boolean) => {
    updateFormData('recurring', checked);
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <Checkbox
        id="recurring"
        checked={checked}
        onCheckedChange={handleChange}
        className="h-5 w-5"
      />
      <Label htmlFor="recurring" className="text-preset-5">
        {title}
      </Label>
    </div>
  );
}
