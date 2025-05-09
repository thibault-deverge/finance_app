import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';

function EditButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      className="w-full cursor-pointer py-6"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : 'Save Changes'}
    </Button>
  );
}

export default EditButton;
