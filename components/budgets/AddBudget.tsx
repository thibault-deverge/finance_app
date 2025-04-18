'use client';
import Modal from '../Modal';

function AddBudget() {
  return (
    <Modal>
      <Modal.AddNewButton>+ Add New Budget</Modal.AddNewButton>
      <Modal.Content>
        <Modal.Header>Add New Budget</Modal.Header>
        <Modal.Description>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </Modal.Description>
        <Modal.Category />
        <Modal.Amount />
        <Modal.Chart />
        <Modal.Theme />
      </Modal.Content>
    </Modal>
  );
}

export default AddBudget;
