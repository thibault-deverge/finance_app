import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";

function Page() {
  return (
    <>
      <AuthHeader />
      <main className="flex flex-col justify-center items-center h-[93vh] px-4">
        {/* Hero */}

        {/* Login Card */}
        <section className="bg-white w-[95%] max-w-[35rem] flex flex-col gap-8 px-5 py-8 rounded-xl">
          <h1 className="text-preset-1">Sign Up</h1>
          <SignUpForm />
        </section>
      </main>
    </>
  );
}

export default Page;
