"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupAction } from "@/actions/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupFormSchema } from "@/lib/schemas";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpinnerMini from "../SpinnerMini";

type FormFields = z.infer<typeof signupFormSchema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(signupFormSchema),
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { name, email, password } = data;
    try {
      await signupAction({ name, email, password });
      router.push("/login");
    } catch (err) {
      const error = err as Error;
      setError("root", { message: error.message || "Signup failed." });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name Form Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5-bold text-grey-500">Name</FormLabel>
              <FormControl>
                <Input className="border-beige-500" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="w-full text-red-800" />
            </FormItem>
          )}
        />
        {/* Email Form Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5-bold text-grey-500">Email</FormLabel>
              <FormControl>
                <Input className="border-beige-500" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="w-full text-red-800" />
            </FormItem>
          )}
        />
        {/* Password Form Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-preset-5-bold text-grey-500">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} className="border-beige-500" {...field} />
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="w-full text-red-800" />
              </FormItem>
            );
          }}
        />
        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5-bold text-grey-500">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showConfirmPassword ? "text" : "password"} className="border-beige-500" {...field} />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="w-full text-red-800" />
            </FormItem>
          )}
        />
        {/* Error message for root errors */}
        {form.formState.errors.root && <p className="text-red-800">{form.formState.errors.root.message}</p>}
        {/* Submit Button */}
        <Button type="submit" variant="primary" disabled={form.formState.isSubmitting} className="w-full py-6 my-4 cursor-pointer text-preset-4-bold text-white rounded-lg">
          {form.formState.isSubmitting ? <SpinnerMini /> : "Create account"}
        </Button>
      </form>
    </Form>
  );
}
