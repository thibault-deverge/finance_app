'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '../ui/Modal';
import { Budget } from './BudgetCard';
import { Button } from '../ui/button';

function BudgetDropDown({ category, maximum, theme }: Budget) {
  const budget = { category, maximum, theme };
  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-grey-300 cursor-pointer">
          ...
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="z-50 border-none bg-white"
        >
          <Modal.Open opens="edit-budget">
            <DropdownMenuItem className="hover:bg-grey-100">
              Edit Budget
            </DropdownMenuItem>
          </Modal.Open>

          <div className="mx-auto my-1 h-px w-[80%] border-b border-gray-300 last:border-b-0"></div>
          <Modal.Open opens="delete-budget">
            <DropdownMenuItem className="hover:bg-grey-100 text-red">
              Delete Budget
            </DropdownMenuItem>
          </Modal.Open>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-budget" initialData={budget}>
        <Modal.Header title="Edit Budget" />
        <Modal.Description description="As your budgets change, feel free to update your spending limits." />
        <Modal.Category title="Budget Category" />
        <Modal.Amount title="Maximum Spending" />
        <Modal.Theme title="Theme" />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Save Changes
        </Button>
      </Modal.Window>
      <Modal.Window name="delete-budget" initialData={budget}>
        <Modal.Header title={`Delete '${category}'`} />
        <Modal.Description description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever." />
        <Button
          type="submit"
          variant="destructive"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Yes,Confirm Deletion
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          No Go Back
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default BudgetDropDown;
