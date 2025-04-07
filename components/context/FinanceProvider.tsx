'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type FinanceContextType = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

function FinanceProvider({ children }: ProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <FinanceContext.Provider value={{ isVisible, setIsVisible }}>
      <main
        className={`transition-grid-cols grid min-h-screen grid-cols-2 duration-300 ease-in-out ${isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[64px_1fr]'}`}
      >
        {children}
      </main>
    </FinanceContext.Provider>
  );
}

function useFinance(): FinanceContextType {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}

export { FinanceProvider, useFinance };
