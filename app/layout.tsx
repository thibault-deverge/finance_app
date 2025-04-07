import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/globals.css';
import SideNavigation from '@/components/SideNavigation';
import Navigation from '@/components/Navigation';
import { FinanceProvider } from '@/components/context/FinanceProvider';

export const publicSans = localFont({
  src: [
    {
      path: '../public/fonts/PublicSans-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/PublicSans-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
    {
      path: '../public/fonts/static/PublicSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/PublicSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s / Personal Finance App',
    default: 'Personal Finance App',
  },
  description:
    'Track your spending, manage your budgets, and visualize your savings with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} bg-beige-100 text-grey-900 min-h-screen`}
      >
        <FinanceProvider>
          <Navigation />
          {children}
        </FinanceProvider>
      </body>
    </html>
  );
}
