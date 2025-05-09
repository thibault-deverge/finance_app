'use client';

import { deleteBudget, updateBudget } from '@/actions/budgets';
import DeleteButton from '@/components/button/DeleteButton';
import EditButton from '@/components/button/EditButton';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SpinnerMini } from '@/components/ui/SpinnerMini';
import { Budget } from '@prisma/client';
import { Suspense } from 'react';

function EditDeleteBudget({ budget }: { budget: Budget }) {
  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Menu options"
          className="text-grey-300 cursor-pointer"
        >
          ...
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 border-none bg-white">
          <Modal.Open opens="edit-budget">
            <DropdownMenuItem
              className="hover:bg-grey-100 focus:bg-grey-100 focus:outline-none"
              tabIndex={0}
              role="menuitem"
            >
              Edit Budget
            </DropdownMenuItem>
          </Modal.Open>

          <div className="mx-auto my-1 h-px w-[80%] border-b border-gray-300 last:border-b-0"></div>
          <Modal.Open opens="delete-budget">
            <DropdownMenuItem
              className="hover:bg-grey-100 focus:bg-grey-100 text-red focus:outline-none"
              tabIndex={0}
              role="menuitem"
            >
              Delete Budget
            </DropdownMenuItem>
          </Modal.Open>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window
        name="edit-budget"
        initialData={budget}
        formAction={updateBudget}
      >
        <Modal.Header title="Edit Budget" />
        <Modal.Description description="As your budgets change, feel free to update your spending limits." />
        <Modal.Category title="Budget Category" />
        <Modal.Amount title="Maximum Spending" name="budget" />
        <Modal.Theme title="Theme" />
        <Suspense fallback={<SpinnerMini />}>
          <EditButton />
        </Suspense>
      </Modal.Window>
      <Modal.Window
        name="delete-budget"
        initialData={budget}
        formAction={deleteBudget}
      >
        <Modal.Header title={`Delete '${budget.category}'`} />
        <Modal.Description description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever." />
        <Suspense fallback={<SpinnerMini />}>
          <DeleteButton />
        </Suspense>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full cursor-pointer border-0 py-6 shadow-sm"
        >
          No Go Back
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default EditDeleteBudget;
