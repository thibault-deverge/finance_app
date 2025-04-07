import { ReactNode } from 'react';
import { FinanceProvider } from '@/components/context/FinanceProvider';
import Navigation from '@/components/Navigation';
import MainLayout from '@/components/MainLayout';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <FinanceProvider>
      <MainLayout>
        <Navigation />
        {children}
      </MainLayout>
    </FinanceProvider>
  );
}
