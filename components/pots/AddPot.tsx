'use client';
import { createPot } from '@/actions/pots';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import { Pot } from '@prisma/client';
import { Suspense } from 'react';
import AddButton from '../button/AddButton';
import { SpinnerMini } from '../ui/SpinnerMini';

function AddPot({ pots }: { pots: Pot[] }) {
  return (
    <Modal>
      <Modal.Open opens="add-pot">
        <Button
          className="text-preset-4-bold max-w-[9.68rem] cursor-pointer rounded-lg p-4 text-white"
          variant="primary"
        >
          + Add New Pot
        </Button>
      </Modal.Open>
      <Modal.Window name="add-pot" formAction={createPot}>
        <Modal.Header title="Add New Pot" />
        <Modal.Description description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases." />
        <Modal.Name title="Pot Name" />
        <Modal.Target title="Target" name="pot" />
        <Modal.Theme title="Theme" />

        <Suspense fallback={<SpinnerMini />}>
          <AddButton type="add-pot" />
        </Suspense>
      </Modal.Window>
    </Modal>
  );
}

export default AddPot;
