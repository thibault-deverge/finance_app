import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { BtnLogout } from '@/components/auth/BtnLogout';
import DashboardCards from '@/components/DashboardCards';
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
        <section className="grid min-h-screen grid-cols-12 gap-8 px-4 py-6">
          <div className="col-span-full mb-8">
            <Title name="Overview" />
          </div>

          <div className="col-span-full mb-8">
            <DashboardCards />
          </div>

          <div className="col-span-full flex h-full flex-grow flex-col gap-8 md:flex-row">
            <div className="flex flex-1 flex-col gap-8 md:w-7/12">
              <div className="h-1/4 rounded-lg bg-yellow-400 p-4">Pots</div>
              <div className="h-3/4 rounded-lg bg-green-400 p-4">
                Transactions
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-8 md:w-5/12">
              <div className="h-3/5 rounded-lg bg-red-400 p-4">Budgets</div>
              <div className="h-2/5 rounded-lg bg-blue-400 p-4">
                Recurring Bills
              </div>
            </div>
          </div>

          <div className="col-span-full mt-8">
            <BtnLogout>Logout</BtnLogout>
          </div>
        </section>
      </main>
    </>
  );
}
