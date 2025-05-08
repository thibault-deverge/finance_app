'use client';
import { addMoneyToPot } from '@/actions/pots';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal/Modal';
import { Pot } from '@prisma/client';
import { useState } from 'react';
import ProgressBarWithPreview from '../ui/ProgressBarWithPreview';

function AddMoney({ pot }: { pot: Pot }) {
  const { name, theme, target, total } = pot;
  const [inputAmount, setInputAmount] = useState(0);

  // Fonction qui sera transmise à InputAmount pour mettre à jour la valeur d'entrée
  const handleAmountChange = (value: number) => {
    setInputAmount(value);
  };
  // const percentage = parseFloat(((total / target) * 100).toFixed(2));
  return (
    <Modal>
      <Modal.Open opens="add-moneypot">
        <Button variant="oauth" className="flex-1">
          + Add Money
        </Button>
      </Modal.Open>
      <Modal.Window name="add-moneypot" formAction={addMoneyToPot}>
        <Modal.Header title={`Add to ‘${name}’`} />
        <Modal.Description description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance." />
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-preset-4 text-grey-500">New Amount</h4>
          <h5 className="text-preset-1 text-grey-900">
            ${Number(total).toFixed(2)}
          </h5>
        </div>
        <div className="mb-7 flex flex-col gap-3">
          {/* <ProgressBarWithPreview
            currentTotal={total}
            target={target}
            inputAmount={inputAmount}
            theme={theme ?? '#f2cdac'}
          /> */}
          <ProgressBarWithPreview
            name="add-moneypot"
            currentTotal={total}
            target={target}
            inputAmount={inputAmount}
            theme={theme ?? '#f2cdac'}
          />
        </div>
        <Modal.Amount
          title="Amount to Add"
          name="addMoneyPot"
          onAmountChange={handleAmountChange}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Confirm Addition
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default AddMoney;
