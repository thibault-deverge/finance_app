import ModalSelectColor from '@/components/ui/Modal/ModalSelectColor';
import { useFormContext } from '@/components/ui/Modal/Window';

function Theme({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();
  const handleChange = (value: string) => {
    updateFormData('theme', value);
  };
  return (
    <ModalSelectColor
      title={title}
      value={formData.theme}
      onChange={handleChange}
    />
  );
}

export default Theme;
