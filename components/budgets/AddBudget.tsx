'use client';
import { createBudget } from '@/actions/budgets';
import AddButton from '@/components/button/AddButton';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';
import { budgetSchema } from '@/lib/schemas';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

function AddBudget() {
  return (
    <>
      <Toaster position="top-center" />
      <Modal>
        <Modal.Open opens="add-budget">
          <Button
            className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
            variant="primary"
          >
            + Add New Budget
          </Button>
        </Modal.Open>
        <Modal.Window
          name="add-budget"
          formAction={createBudget}
          validationSchema={budgetSchema}
        >
          <Modal.Header title="Add New Budget" />
          <Modal.Description
            description="Choose a category to set a spending budget. These categories can help
          you monitor spending."
          />
          <Modal.Category title="Budget Category" />
          <Modal.Amount title="Maximum Spending" name="budget" />
          <Modal.Theme title="Theme" />
          <Suspense fallback={<SpinnerMini />}>
            <AddButton type="add-budget" />
          </Suspense>
        </Modal.Window>
      </Modal>
    </>
  );
}

export default AddBudget;
