import { requireAuth } from "@/lib/auth";

import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignOutButton } from "@/components/auth/LogoutButton";

export default async function Page() {
	const session = await requireAuth();
	const user = session?.user?.email || session?.user?.name;

	return (
		<>
			<AuthHeader />
			<main className="flex flex-col items-center justify-center gap-6 py-16">
				<h1 className="text-4xl">Hello {user} !</h1>
				<p className="text-xl">Welcome to the dashboard.</p>
				<SignOutButton />
			</main>
		</>
	);
}
