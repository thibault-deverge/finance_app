import ModalInput from '@/components/ui/Modal/ModalInput';
import { useFormContext } from '@/components/ui/Modal/Window';

function Target({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: number) => {
    updateFormData('target', value);
  };
  return (
    <ModalInput
      title={title}
      value={Number(formData.target)}
      onChange={handleChange}
    />
  );
}

export default Target;
