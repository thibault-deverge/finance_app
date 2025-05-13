'use client';
import { z } from 'zod';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/lib/schemas';

import BtnOauth from '@/components/auth/BtnOauth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SpinnerMini } from '@/components/ui/SpinnerMini';
import { Eye, EyeOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

type FormFields = z.infer<typeof authSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormFields>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
    if (res?.error) form.setError('root', { message: 'Invalid credentials.' });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Email Form Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5-bold text-grey-500">
                Email
              </FormLabel>
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
                <FormLabel className="text-preset-5-bold text-grey-500">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      className="border-beige-500"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="w-full text-red-800" />
              </FormItem>
            );
          }}
        />
        {/* Error message for root errors */}
        {form.formState.errors.root && (
          <p className="text-red-800">{form.formState.errors.root.message}</p>
        )}
        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={form.formState.isSubmitting}
          className="text-preset-4-bold mt-4 w-full cursor-pointer py-6 text-white"
        >
          {form.formState.isSubmitting ? <SpinnerMini /> : 'Login'}
        </Button>

        {/* Github Button */}
        <BtnOauth provider="github">
          Sign in with Github{' '}
          <FaGithub style={{ width: '24px', height: '24px' }} />
        </BtnOauth>
      </form>
    </Form>
  );
}

export default LoginForm;
