'use client';
import BudgetSelectCategory from '@/components/modal/BudgetSelectCategory';
import { useFormContext } from '@/components/modal/Window';

function Category({ title }: { title: string }) {
  const { formData, updateFormData, errors } = useFormContext();
  const error = errors?.category;

  const handleChange = (value: string) => {
    updateFormData('category', value);
  };
  return (
    <>
      <BudgetSelectCategory
        title={title}
        value={formData.category}
        onChange={handleChange}
        error={error}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}

export default Category;
