'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '../ui/Modal';

function BudgetDropDown() {
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
      <Modal.Window name="edit-budget">
        <Modal.Header title="Modifier le budget" />
        <Modal.Description description="Mettez à jour les paramètres de votre budget. Ces catégories vous aident à surveiller vos dépenses." />
      </Modal.Window>
      <Modal.Window name="delete-budget">
        <Modal.Header title="Modifier le budget" />
        <Modal.Description description="Mettez à jour les paramètres de votre budget. Ces catégories vous aident à surveiller vos dépenses." />
      </Modal.Window>
    </Modal>
  );
}

export default BudgetDropDown;
