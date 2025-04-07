// app/app/layout.tsx
import { ReactNode } from 'react';
import { FinanceProvider } from '@/components/context/FinanceProvider';
import Navigation from '@/components/Navigation';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FinanceProvider>
      <Navigation />
      {children}
    </FinanceProvider>
  );
}
