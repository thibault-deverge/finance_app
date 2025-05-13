import type { Metadata } from 'next';
import { publicSans } from '@/lib/font';

import '@/styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}
