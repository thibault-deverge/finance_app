import { z } from 'zod';

// Schéma pour la validation du formulaire côté client
export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Schéma pour la validation du formulaire côté client (avec confirmPassword)
export const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Schéma pour la validation côté serveur (sans confirmPassword)
export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

// Schéma Budget pour la validation coter client
export const budgetSchema = z.object({
  category: z.string().min(1, { message: 'Category is required' }),
  maximum: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    { message: 'The maximum amount must be a positive number' }
  ),
  theme: z.string().min(1, { message: 'Please select a theme' }),
});

// Schéma Pot pour la validation coter client
export const potSchema = z.object({
  name: z.string().min(1, { message: 'The pot name is required' }),
  target: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    },
    { message: 'The target should be a positive number' }
  ),
  theme: z.string().min(1, { message: 'Please select a theme' }),
});

// Schéma Transaction pour la validation coter client
export const transactionSchema = z.object({
  name: z.string().min(1, { message: 'Transaction name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  amount: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num);
    },
    { message: 'Amount must be a valid number' }
  ),
  date: z.string().min(1, { message: 'The date is required' }),
});
