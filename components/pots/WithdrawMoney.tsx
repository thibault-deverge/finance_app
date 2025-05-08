'use client';
import { addMoneyToPot } from '@/actions/pots';
import { Button } from '@/components/ui/button';
import Modal from '@/components/modal/Modal';
import { Pot } from '@prisma/client';
import { useState } from 'react';
import ProgressBarWithPreview from '../ui/ProgressBarWithPreview';

function WithdrawMoney({ pot }: { pot: Pot }) {
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
          Withdraw
        </Button>
      </Modal.Open>
      <Modal.Window name="add-moneypot" formAction={addMoneyToPot}>
        <Modal.Header title={`Withdraw from ‘${name}’`} />
        <Modal.Description description="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot." />
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-preset-4 text-grey-500">New Amount</h4>
          <h5 className="text-preset-1 text-grey-900">
            ${Number(total).toFixed(2)}
          </h5>
        </div>
        <div className="mb-7 flex flex-col gap-3">
          <ProgressBarWithPreview
            name="withdraw-moneypot"
            currentTotal={total}
            target={target}
            inputAmount={inputAmount}
            theme={theme ?? '#f2cdac'}
          />
        </div>
        <Modal.Amount
          title="Amount to Withdraw"
          name="withdrawMoneyPot"
          onAmountChange={handleAmountChange}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer py-6"
        >
          Confirm Withdraw
        </Button>
      </Modal.Window>
    </Modal>
  );
}

export default WithdrawMoney;
