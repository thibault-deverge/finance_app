'use client';
import { createBudget } from '@/actions/budgets';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal/Modal';

function AddBudget() {
  return (
    <Modal>
      <Modal.Open opens="add-budget">
        <Button
          className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
          variant="primary"
        >
          + Add New Budget
        </Button>
      </Modal.Open>
      <Modal.Window name="add-budget" formAction={createBudget}>
        <Modal.Header title="Add New Budget" />
        <Modal.Description
          description="Choose a category to set a spending budget. These categories can help
          you monitor spending."
        />
        <Modal.Category title="Budget Category" />
        <Modal.Amount title="Maximum Spending" name="budget"/>
        <Modal.Theme title="Theme" />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Add Budget
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default AddBudget;
