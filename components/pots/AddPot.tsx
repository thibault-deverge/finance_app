'use client';
import { createPot } from '@/actions/pots';
import { Button } from '../ui/button';
import Modal from '../ui/Modal';

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
      <Modal.Window name="add-pot" formAction={createPot}>
        <Modal.Header title="Add New Pot" />
        <Modal.Description
          description="Choose a category to set a spending pot. These categories can help
          you monitor spending."
        />
        <Modal.Category title="Pot Name" />
        <Modal.Amount title="Target" />
        <Modal.Theme title="Color Tag" />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Add Pot
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default AddPot;
