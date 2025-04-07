import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthPanel } from '@/components/auth/AuthPanel';
import { HeroPanel } from '@/components/auth/HeroPanel';

async function Page() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <>
      <AuthHeader />

      <main className="flex h-[93vh] w-full flex-col items-center justify-center px-4 lg:h-[100vh] lg:flex-row lg:justify-between">
        <HeroPanel />
        <AuthPanel />
      </main>
    </>
  );
}

export default Page;
