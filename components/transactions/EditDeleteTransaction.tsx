'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '@/components/modal/Modal';
import CancelButton from '@/components/button/CancelButton';
import DeleteButton from '@/components/button/DeleteButton';
import EditButton from '@/components/button/EditButton';
import { Transaction } from '@prisma/client';
import { Suspense } from 'react';

import { deleteTransaction, updateTransaction } from '@/actions/transactions';
import { SpinnerMini } from '@/components/ui/SpinnerMini';
import { transactionSchema } from '@/lib/schemas';
import { EllipsisVertical } from 'lucide-react';

type Props = {
  transaction: Transaction;
};

export default function EditDeleteTransaction({ transaction }: Props) {
  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Menu options"
          className="text-grey-300 cursor-pointer text-lg"
        >
          <EllipsisVertical className="h-5 w-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="z-50 border-none bg-white">
          <Modal.Open opens="edit-transaction">
            <DropdownMenuItem
              className="hover:bg-grey-100 focus:bg-grey-100 focus:outline-none"
              tabIndex={0}
              role="menuitem"
            >
              Edit Transaction
            </DropdownMenuItem>
          </Modal.Open>

          <div className="mx-auto my-1 h-px w-[80%] border-b border-gray-300 last:border-b-0"></div>

          <Modal.Open opens="delete-transaction">
            <DropdownMenuItem
              className="hover:bg-grey-100 focus:bg-grey-100 text-red focus:outline-none"
              tabIndex={0}
              role="menuitem"
            >
              Delete Transaction
            </DropdownMenuItem>
          </Modal.Open>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT MODAL */}
      <Modal.Window
        name="edit-transaction"
        initialData={transaction}
        formAction={updateTransaction}
        validationSchema={transactionSchema}
      >
        <Modal.Header title="Edit Transaction" />
        <Modal.Description description="Modify transaction details below." />
        <Modal.Name title="Name" />
        <Modal.Amount title="Amount" name="amount" />
        <Modal.Category title="Category" />
        <Modal.Date title="Date" />
        <Modal.Recurring title="Recurring" />

        <Suspense fallback={<SpinnerMini />}>
          <EditButton />
        </Suspense>
      </Modal.Window>

      {/* DELETE MODAL */}
      <Modal.Window
        name="delete-transaction"
        initialData={transaction}
        formAction={deleteTransaction}
      >
        <Modal.Header title={`Delete '${transaction.name}'`} />
        <Modal.Description description="Are you sure you want to delete this transaction? This cannot be undone." />
        <Suspense fallback={<SpinnerMini />}>
          <DeleteButton />
        </Suspense>
        <CancelButton />
      </Modal.Window>
    </Modal>
  );
}
