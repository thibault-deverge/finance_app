// app/app/layout.tsx
import { ReactNode } from 'react';
import { FinanceProvider } from '@/components/context/FinanceProvider';
import Navigation from '@/components/Navigation';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FinanceProvider>
      <Navigation />
      <main className="flex-1 p-4">{children}</main>
    </FinanceProvider>
  );
}
