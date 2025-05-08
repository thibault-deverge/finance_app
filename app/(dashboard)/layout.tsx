'use client';
import SideNavigation from '@/components/ui/SideNavigation';
import { Spinner } from '@/components/ui/Spinner';
import { ReactNode, Suspense, useState } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main
      className={`grid min-h-screen grid-cols-1 overflow-auto transition-all duration-300 ease-in-out ${
        isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[64px_1fr]'
      }`}
    >
      <SideNavigation isVisible={isVisible} setIsVisible={setIsVisible} />
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center p-8">
            <Spinner />
          </div>
        }
      >
        <div className="w-full overflow-auto">{children}</div>
      </Suspense>
    </main>
  );
}
