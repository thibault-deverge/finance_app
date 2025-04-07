'use client';
import { useFinance } from '@/components/context/FinanceProvider';

function MainLayout({ children }) {
  const { isVisible } = useFinance();
  return (
    <main
      className={`transition-grid-cols grid min-h-screen grid-cols-2 duration-300 ease-in-out ${isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[64px_1fr]'}`}
    >
      {children}
    </main>
  );
}

export default MainLayout;
