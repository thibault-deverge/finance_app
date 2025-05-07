'use client'
import InputAmount from '@/components/ui/Modal/InputAmount';
import { useFormContext } from '@/components/ui/Modal/Window';

function Amount({ title, name }: { title: string; name: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: number) => {
    updateFormData('maximum', value);
  };
  return (
    <InputAmount
      title={title}
      value={Number(formData.maximum)}
      onChange={handleChange}
      name={name}
    />
  );
}

export default Amount;
