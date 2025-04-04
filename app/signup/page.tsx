"use client";
// import { z } from "zod";

import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";

// import { authSchema } from "@/lib/schemas";
import Link from "next/link";

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
  // const router = useRouter();
  // const {
  // 	register,
  // 	handleSubmit,
  // 	setError,
  // 	formState: { errors, isSubmitting },
  // } = useForm<FormFields>({
  // 	resolver: zodResolver(authSchema),
  // });

  // const onSubmit: SubmitHandler<FormFields> = async (data) => {
  // 	const { email, password } = data;
  // 	try {
  // 		await signupAction({ email, password });
  // 		router.push("/login");
  // 	} catch (err) {
  // 		const error = err as Error;
  // 		setError("root", { message: error.message || "Signup failed." });
  // 	}
  // };

  // return (
  // 	<section>
  // 		<form onSubmit={handleSubmit(onSubmit)}>
  // 			<div className="flex gap-2">
  // 				<label>Email</label>
  // 				<input type="email" {...register("email")} />
  // 				{errors.email && <p>{errors.email.message}</p>}
  // 			</div>
  // 			<div className="flex gap-2">
  // 				<label>Password</label>
  // 				<input type="password" {...register("password")} />
  // 				{errors.password && <p>{errors.password.message}</p>}
  // 			</div>
  // 			{errors.root && <p>{errors.root.message}</p>}
  // 			<button
  // 				type="submit"
  // 				disabled={isSubmitting}
  // 				className="px-4 py-2 bg-blue-500 text-white rounded"
  // 			>
  // 				{isSubmitting ? "Signing Up..." : "Sign Up"}
  // 			</button>
  // 		</form>
  // 	</section>
  // );
}

export default Page;
