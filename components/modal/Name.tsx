'use client';
import PotInputName from '@/components/modal/PotInputName';
import { useFormContext } from '@/components/modal/Window';

function Name({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: string) => {
    updateFormData('name', value);
  };
  return (
    <PotInputName
      title={title}
      value={formData.name}
      onChange={handleChange}
      maxLength={30}
    />
  );
}
export default Name;
