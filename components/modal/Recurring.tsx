'use client';

import { useFormContext } from '@/components/modal/Window';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function RecurringSwitch({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();
  const checked = Boolean(formData.recurring);

  return (
    <div className="mb-4 flex items-center gap-3">
      <Switch
        id="recurring"
        checked={checked}
        onCheckedChange={(val) => updateFormData('recurring', Boolean(val))}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${checked ? 'bg-gray-900' : 'bg-gray-300'} `}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0'} `}
        />
      </Switch>

      <Label htmlFor="recurring" className="text-preset-5">
        {title}
      </Label>
    </div>
  );
}
