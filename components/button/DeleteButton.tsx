import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      size="lg"
      className="w-full cursor-pointer py-6"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : 'Yes, Confirm Deletion'}
    </Button>
  );
}

export default DeleteButton;
