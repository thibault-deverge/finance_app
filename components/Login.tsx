"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5 text-grey-500">Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5 text-grey-500">Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}>
                  <img src="/images/icons/icon-show-password.svg" alt="icon show password" />
                </Input>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" className="w-full py-4 mb-8 ">
          Login
        </Button>
      </form>
    </Form>
  );
}

function Login() {
  return (
    <div className="my-6 mx-5">
      <h1 className="text-preset1 mb-8">Login</h1>
      <LoginForm />
      <footer className="flex  justify-between gap-2 mx-8">
        <p className="text-preset-4 text-grey-500">Need to create an account ?</p>
        <Link href="/signup" className="underline text-preset-4-bold">
          Sign Up
        </Link>
      </footer>
    </div>
  );
}

export default Login;
