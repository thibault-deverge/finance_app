'use client';
import InputAmount from '@/components/modal/InputAmount';
import { useFormContext } from '@/components/modal/Window';

function Amount({
  title,
  name,
  id,
  onAmountChange,
}: {
  title: string;
  name: string;
  id?: string;
  onAmountChange?: (value: number) => void;
}) {
  const { formData, updateFormData } = useFormContext();

  const handleChangeBudget = (value: number) => {
    updateFormData('maximum', value);
  };

  const handleChangePot = (value: number) => {
    updateFormData('total', value);
    updateFormData('id', id ?? '');

    // Propagez le changement au parent si nécessaire
    if (onAmountChange) onAmountChange(value);
  };

  if (name === 'amount') {
    return (
      <InputAmount
        title={title}
        name="amount"
        value={Number(formData.amount) || 0}
        onChange={(v) => updateFormData('amount', v)}
        min={-10000000}
        max={10000000}
      />
    );
  }

  if (name === 'budget') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.maximum) || 0}
        onChange={handleChangeBudget}
        name={name}
      />
    );
  }
  if (name === 'addMoneyPot' || 'withdrawMoneyPot') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.total) || 0}
        onChange={handleChangePot}
        name={name}
      />
    );
  }

  return null;
}

export default Amount;
