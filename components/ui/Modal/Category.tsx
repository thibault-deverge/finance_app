'use client';
import BudgetSelectCategory from '@/components/ui/Modal/BudgetSelectCategory';
import { useFormContext } from '@/components/ui/Modal/Window';

function Category({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: string) => {
    updateFormData('category', value);
  };
  return (
    <BudgetSelectCategory
      title={title}
      value={formData.category}
      onChange={handleChange}
    />
  );
}

export default Category;
