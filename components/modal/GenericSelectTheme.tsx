'use client';
import GenericSelectTheme from '@/components/modal/ModalSelectColor';
import { useFormContext } from '@/components/modal/Window';

function Theme({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();
  const handleChange = (value: string) => {
    updateFormData('theme', value);
  };
  return (
    <GenericSelectTheme
      title={title}
      value={formData.theme}
      onChange={handleChange}
    />
  );
}

export default Theme;
