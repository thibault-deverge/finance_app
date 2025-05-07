import ModalNameInput from '@/components/ui/Modal/ModalNameInput';
import { useFormContext } from '@/components/ui/Modal/Window';

function Name({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: string) => {
    updateFormData('name', value);
  };
  return (
    <ModalNameInput
      title={title}
      value={formData.name}
      onChange={handleChange}
      maxLength={30}
    />
  );
}
export default Name;
