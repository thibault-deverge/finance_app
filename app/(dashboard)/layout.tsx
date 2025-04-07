'use client';
import SideNavigation from '@/components/SideNavigation';
import { ReactNode, useState } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main
      className={`transition-grid-cols grid min-h-screen grid-cols-2 duration-300 ease-in-out ${isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[64px_1fr]'}`}
    >
      <SideNavigation isVisible={isVisible} setIsVisible={setIsVisible} />
      {children}
    </main>
  );
}
