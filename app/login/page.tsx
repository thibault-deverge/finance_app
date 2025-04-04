import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

import { LoginForm } from '@/components/auth/LoginForm';
import { AuthHeader } from '@/components/auth/AuthHeader';
import Link from 'next/link';

async function Page() {
  const session = await auth();
  if (session) redirect('/');

  return (
    <>
      <AuthHeader />
      <main className="flex h-[93vh] w-full flex-col items-center justify-center px-4">
        {/* Hero */}

        {/* Login Card */}
        <section className="flex w-full max-w-[343px] sm:max-w-[560px] flex-col gap-8 rounded-xl bg-white px-5 py-8">
          <h1 className="text-preset-1">Login</h1>
          <LoginForm />
          <div className="flex items-center justify-center gap-2">
            <p className="text-preset-4 text-grey-500">
              Need to create an account?
            </p>
            <Link href="/signup">
              <button className="text-preset-4-bold text-grey-900 hover:text-grey-500 cursor-pointer border-b capitalize transition-all duration-200">
                Sign Up
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Page;
