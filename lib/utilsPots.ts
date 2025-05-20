import { Pot } from '@prisma/client';

export function getTotalSaved(pots: Pot[]): number {
  return pots.reduce((acc, pot) => acc + pot.total, 0);
}
