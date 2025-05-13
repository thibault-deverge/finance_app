'use client';
import { Suspense } from 'react';
import { createTransaction } from '@/actions/transactions';

import Modal from '@/components/modal/Modal';
import AddButton from '@/components/button/AddButton';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';

function AddTransaction() {
  return (
    <Modal>
      <Modal.Open opens="add-transaction">
        <Button
          className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
          variant="primary"
        >
          + Add Transactions
        </Button>
      </Modal.Open>
      <Modal.Window name="add-transaction" formAction={createTransaction}>
        <Modal.Header title="Add New Transaction" />
        <Modal.Description description="Fill in the details below to record a new transaction in your ledger." />
        <Modal.Avatar />
        <Modal.Name title="Transaction Name" />
        <Modal.Amount title="Amount" name="amount" />
        <Modal.Category title="Category" />
        <Modal.Date title="Date" />
        <Modal.Recurring title="Recurring (every month)" />

        <Suspense fallback={<SpinnerMini />}>
          <AddButton type="add-transaction" />
        </Suspense>
      </Modal.Window>
    </Modal>
  );
}

export default AddTransaction;
