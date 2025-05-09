import { Transaction } from '@prisma/client';
import { formatAmount, getMonthlyLabel } from '@/lib/utils';
import { AVATAR_DEFAULT } from '@/lib/constants';

import { RecurringBillView } from '@/components/recurring/type';

export function mapToRecurringBillView(tx: Transaction): RecurringBillView {
  const day = new Date(tx.date).getUTCDate();
  const now = new Date();
  const currentDue = new Date(now.getFullYear(), now.getMonth(), day);

  const isPast = now > currentDue;
  const msUntilDue = currentDue.getTime() - now.getTime();
  const isSoon = !isPast && msUntilDue <= 7 * 24 * 60 * 60 * 1000;

  let iconSrc = '';
  let altText = '';

  if (isPast) {
    iconSrc = '/images/icons/icon-bill-paid.svg';
    altText = 'Bill paid';
  } else if (isSoon) {
    iconSrc = '/images/icons/icon-bill-due.svg';
    altText = 'Bill due';
  }

  return {
    id: tx.id,
    avatar: tx.avatar || AVATAR_DEFAULT,
    name: tx.name,
    label: getMonthlyLabel(day),
    iconSrc,
    altText,
    amount: `$${formatAmount(Math.abs(tx.amount))}`,
  };
}
