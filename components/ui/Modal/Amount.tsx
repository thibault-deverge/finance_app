'use client';
import InputAmount from '@/components/ui/Modal/InputAmount';
import { useFormContext } from '@/components/ui/Modal/Window';

function Amount({ title, name }: { title: string; name: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChangeBudget = (value: number) => {
    updateFormData('maximum', value);
  };

  const handleChangePot = (value: number) => {
    updateFormData('target', value);
  };

  if (name === 'budget') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.maximum) || 0}
        onChange={handleChangeBudget}
        name={name}
      />
    );
  }

  if (name === 'pot') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.target) || 0}
        onChange={handleChangePot}
        name={name}
      />
    );
  }

  return null;
}

export default Amount;
