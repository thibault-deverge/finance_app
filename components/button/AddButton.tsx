import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';

function AddButton({ type }: { type: string }) {
  const { pending } = useFormStatus();
  let content: React.ReactNode;

  if (pending) {
    content = <SpinnerMini />;
  } else {
    switch (type) {
      case 'add-budget':
        content = 'Add Budget';
        break;
      case 'add-pot':
        content = 'Add Pot';
        break;
      case 'add-transaction':
        content = 'Add Transaction';
        break;
      default:
        content = 'Submit';
    }
  }

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      className="w-full cursor-pointer py-6"
      disabled={pending}
    >
      {content}
    </Button>
  );
}

export default AddButton;
