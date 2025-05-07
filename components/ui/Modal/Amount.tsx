import ModalInput from '@/components/ui/Modal/ModalInput';
import { useFormContext } from '@/components/ui/Modal/Window';

function Amount({ title }: { title: string }) {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (value: number) => {
    updateFormData('maximum', value);
  };
  return (
    <ModalInput
      title={title}
      value={Number(formData.maximum)}
      onChange={handleChange}
    />
  );
}

export default Amount;
