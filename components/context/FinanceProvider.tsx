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
      {children}
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
