import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { BtnLogout } from '@/components/auth/BtnLogout';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/auth');

  // Get user email or name
  const user = session?.user?.email || session?.user?.name;

  return (
    <>
      <AuthHeader />
      <main className="flex flex-col items-center justify-center gap-6 py-16">
        <h1 className="text-4xl">Hello {user} !</h1>
        <p className="text-xl">Welcome to the dashboard.</p>
        <BtnLogout>Logout</BtnLogout>
      </main>
    </>
  );
}
