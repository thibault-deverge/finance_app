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
  const { formData, updateFormData, errors } = useFormContext();
  const error =
    name === 'budget'
      ? errors?.maximum
      : name === 'amount'
        ? errors?.amount
        : null;
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
      <>
        <InputAmount
          title={title}
          name="amount"
          value={Number(formData.amount) || 0}
          onChange={(v) => updateFormData('amount', v)}
          min={-10000000}
          max={10000000}
          error={error || ''}
        />
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      </>
    );
  }

  if (name === 'budget') {
    return (
      <>
        <InputAmount
          title={title}
          value={Number(formData.maximum) || 0}
          onChange={handleChangeBudget}
          name={name}
          min={0}
          max={10000000}
          error={error || ''}
        />
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      </>
    );
  }
  if (name === 'addMoneyPot' || 'withdrawMoneyPot') {
    return (
      <>
        <InputAmount
          title={title}
          value={Number(formData.total) || 0}
          onChange={handleChangePot}
          name={name}
          min={0}
          max={10000000}
          error={error || ''}
        />
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      </>
    );
  }

  return null;
}

export default Amount;
