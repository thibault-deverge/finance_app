'use client';
import InputAmount from '@/components/modal/InputAmount';
import { useFormContext } from '@/components/modal/Window';

function Target({ title, name }: { title: string; name: string }) {
  const { formData, updateFormData, errors } = useFormContext();
  const error = errors?.target;
  const handleChange = (value: number) => {
    updateFormData('target', value);
  };
  return (
    <>
      <InputAmount
        title={title}
        value={Number(formData.target)}
        onChange={handleChange}
        name={name}
        error={error}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}

export default Target;
