import { useModal } from "../modal/Modal";
import { Button } from "../ui/button";

function CancelButton() {
    const { close } = useModal();
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="w-full cursor-pointer border-0 py-6 shadow-sm"
      onClick={close}
      aria-label="Close modal and go back"
    >
      No Go Back
    </Button>
  );
}

export default CancelButton;
