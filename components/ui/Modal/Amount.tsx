'use client';
import InputAmount from '@/components/ui/Modal/InputAmount';
import { useFormContext } from '@/components/ui/Modal/Window';

function Amount({
  title,
  name,
  onAmountChange,
}: {
  title: string;
  name: string;
  onAmountChange?: (value: number) => void;
}) {
  const { formData, updateFormData } = useFormContext();

  const handleChangeBudget = (value: number) => {
    updateFormData('maximum', value);
  };

  const handleChangePot = (value: number) => {
    updateFormData('target', value);
  };
  const handleChangePotAdd = (value: number) => {
    updateFormData('total', value);
    // Propagez le changement au parent si nécessaire
    if (onAmountChange) onAmountChange(value);
  };

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
  if (name === 'addMoneyPot' || 'withdraw-moneyPot') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.total) || 0}
        onChange={handleChangePotAdd}
        name={name}
      />
    );
  }

  if (name === 'pot') {
    return (
      <InputAmount
        title={title}
        value={Number(formData.target) || 0}
        onChange={handleChangePot}
        name={name}
      />
    );
  }

  return null;
}

export default Amount;
