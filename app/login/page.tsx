import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { LoginForm } from "@/components/auth/LoginForm";
import { AuthHeader } from "@/components/auth/AuthHeader";

async function Page() {
	const session = await auth();
	if (session) redirect("/");

	return (
		<>
			<AuthHeader />
			<main className="flex flex-col justify-center items-center h-[93vh] px-4">
				{/* Hero */}

				{/* Login Card */}
				<section className="bg-white w-[95%] max-w-[35rem] flex flex-col gap-8 px-5 py-8 rounded-xl">
					<h1 className="text-preset-1">Login</h1>
					<LoginForm />
					<div className="flex justify-center items-center gap-2">
						<p className="text-preset-4 text-grey-500">Need to create an account?</p>
						<button className="text-preset-4-bold text-grey-900 cursor-pointer capitalize border-b hover:scale-105 transition-all duration-200">
							Sign Up
						</button>
					</div>
				</section>
			</main>
		</>
	);
}

export default Page;
