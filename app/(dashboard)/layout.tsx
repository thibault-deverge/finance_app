'use client';
import { Spinner } from '@/components/ui/Spinner';
import { ReactNode, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SideNavigation from '@/components/ui/SideNavigation';

export default function AppLayout({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main
      className={`grid min-h-screen grid-cols-1 overflow-auto transition-all duration-300 ease-in-out ${
        isVisible ? 'xl:grid-cols-[300px_1fr]' : 'xl:grid-cols-[84px_1fr]'
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
        <div className="mb-18 w-full overflow-auto xl:mb-0">
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: '#fff',
                color: '#374151',
              },
            }}
          />
          {children}
        </div>
      </Suspense>
    </main>
  );
}
