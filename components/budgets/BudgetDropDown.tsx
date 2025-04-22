'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '../ui/Modal';
import { Budget } from './BudgetCard';

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
      </Modal.Window>
      
    </Modal>
  );
}

export default BudgetDropDown;
