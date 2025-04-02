"use client";
import { z } from "zod";

import { authSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupAction } from "@/actions/signup";

type FormFields = z.infer<typeof authSchema>;

function Page() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(authSchema),
	});

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		const { email, password } = data;
		try {
			await signupAction({ email, password });
			router.push("/login");
		} catch (err) {
			const error = err as Error;
			setError("root", { message: error.message || "Signup failed." });
		}
	};

	return (
		<section>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-2">
					<label>Email</label>
					<input type="email" {...register("email")} />
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<div className="flex gap-2">
					<label>Password</label>
					<input type="password" {...register("password")} />
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				{errors.root && <p>{errors.root.message}</p>}
				<button
					type="submit"
					disabled={isSubmitting}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					{isSubmitting ? "Signing Up..." : "Sign Up"}
				</button>
			</form>
		</section>
	);
}

export default Page;
