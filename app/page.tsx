import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { FinanceProvider } from '@/components/context/FinanceProvider';
import Dashboard from '@/components/Overview';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/auth');

  return (
    <>
      
        <Dashboard />
      
    </>
  );
}
