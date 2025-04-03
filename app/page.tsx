import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function Page() {
	const session = await auth();
	if (!session) redirect("/login");

	console.log("Session:", session);
	return (
		<>
			<h1>Main Page</h1>
			<SignOutButton />
		</>
	);
}
