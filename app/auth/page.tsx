import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthPanel } from '@/components/auth/AuthPanel';

async function Page() {
  // Check if the user is already authenticated
  const session = await auth();
  if (session) redirect('/');

  return (
    <>
      <AuthHeader />
      <main className="flex h-[93vh] w-full flex-col items-center justify-center px-4">
        {/* Hero */}

        {/* Auth Panel */}
        <AuthPanel />
      </main>
    </>
  );
}

export default Page;
