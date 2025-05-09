import { Pot } from '@prisma/client';

export function getAllPotName({ pots }: { pots: Pot[] }) {
  const names = pots.map((t) => t.name); // extrait les catégories
  console.log(names);
  const uniqueNames = [...new Set(names)]; // supprime les doublons
  return uniqueNames;
}

export function getTotalSaved(pots: Pot[]): number {
  return pots.reduce((acc, pot) => acc + pot.total, 0);
}
