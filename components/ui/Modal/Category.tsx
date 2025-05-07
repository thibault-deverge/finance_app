import ModalSelectCategory from '@/components/ui/Modal/ModalSelectCategory';
import { useFormContext } from '@/components/ui/Modal/Window';

function Category({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: string) => {
    updateFormData('category', value);
  };
  return (
    <ModalSelectCategory
      title={title}
      value={formData.category}
      onChange={handleChange}
    />
  );
}

export default Category;
