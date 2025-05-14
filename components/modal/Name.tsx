'use client';
import InputName from '@/components/modal/InputName';
import { useFormContext } from '@/components/modal/Window';

function Name({ title }: { title: string }) {
  const { formData, updateFormData, errors } = useFormContext();
  const error = errors?.name;
  const handleChange = (value: string) => {
    updateFormData('name', value);
  };
  return (
    <>
      <InputName
        title={title}
        value={formData.name}
        onChange={handleChange}
        maxLength={30}
        error={error}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}
export default Name;
