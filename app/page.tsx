import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { BtnLogout } from '@/components/auth/BtnLogout';
import Title from '@/components/Title';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/auth');

  // Get user email or name
  // const user = session?.user?.name || session?.user?.email;

  return (
    <>
      <main className="grid min-h-screen grid-cols-1 xl:grid-cols-[300px_1fr]">
        <aside className="hidden bg-gray-900 xl:block"></aside>
        <section className="grid grid-cols-8 gap-4 px-4 py-6">
          <div className="col-span-full">
            <Title name="Overview" />
            <p className="text-xl">Welcome to the dashboard.</p>
            <BtnLogout>Logout</BtnLogout>
          </div>
        </section>
      </main>
    </>
  );
}
