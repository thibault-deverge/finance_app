'use client';
import InputAmount from '@/components/ui/Modal/InputAmount';
import { useFormContext } from '@/components/ui/Modal/Window';

function Target({ title, name }: { title: string; name: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: number) => {
    updateFormData('target', value);
  };
  return (
    <InputAmount
      title={title}
      value={Number(formData.target)}
      onChange={handleChange}
      name={name}
    />
  );
}

export default Target;
