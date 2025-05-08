'use client';
import InputAmount from '@/components/modal/InputAmount';
import { useFormContext } from '@/components/modal/Window';

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
