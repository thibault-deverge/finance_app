import Modal from '../ui/Modal';

function EditBudget() {
  return (
    <Modal>
      <Modal.Content>
        <Modal.Header title="Add New Budget" />
        <Modal.Description
          description="Choose a category to set a spending budget. These categories can help
              you monitor spending."
        />
        <Modal.Category title="Budget Category" />
        <Modal.Amount title="Maximum Spending" />
        <Modal.Theme title="Theme" />
        <Modal.BtnModal title="Add Budget" />
      </Modal.Content>
    </Modal>
  );
}

export default EditBudget;
