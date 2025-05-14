'use client';
import GenericSelectTheme from '@/components/modal/ModalSelectColor';
import { useFormContext } from '@/components/modal/Window';

function Theme({ title }: { title: string }) {
  const { formData, updateFormData, errors } = useFormContext();
  const error = errors?.theme;
  const handleChange = (value: string) => {
    updateFormData('theme', value);
  };
  return (
    <>
      <GenericSelectTheme
        title={title}
        value={formData.theme}
        onChange={handleChange}
        error={error}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}

export default Theme;
