'use client';
import { Suspense } from 'react';
import { createPot } from '@/actions/pots';

import Modal from '@/components/modal/Modal';
import AddButton from '@/components/button/AddButton';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';
import { potSchema } from '@/lib/schemas';

function AddPot() {
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
      <Modal.Window
        name="add-pot"
        formAction={createPot}
        validationSchema={potSchema}
      >
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
