'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/features/auth/authThunks';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Loader } from 'lucide-react';

/**
 * Generates a Zod schema for user registration validation.
 */
const makeRegisterSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t('pages.register.form.errors.email') }),
    password: z.string().min(4, { message: t('pages.register.form.errors.password_length') }),
    firstName: z.string().min(1, { message: t('pages.register.form.errors.first_name') }),
    lastName: z.string().min(1, { message: t('pages.register.form.errors.last_name') }),
  });

type RegisterSchema = ReturnType<typeof makeRegisterSchema>['_type'];

interface RegistrationFormProps {
  lng: string;
}

/**
 * RegistrationForm component for handling user sign-ups.
 */
const RegistrationForm: React.FC<RegistrationFormProps> = ({ lng }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, 'translation');

  const { loading, errorCode } = useAppSelector((state) => state.auth);

  // Build schema with localized error messages
  const registerSchema = makeRegisterSchema(t);

  // Setup react-hook-form with zod validation
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  /**
   * Handles the form submission and triggers the user registration process.
   */
  const onSubmit = async (values: RegisterSchema) => {
    const result = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(result)) {
      router.push(`/${lng}/dashboard`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.register.form.email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="name@transact.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.register.form.password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.register.form.first_name')}</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.register.form.last_name')}</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Redux error message */}
        {errorCode && <p className="text-red-500 text-sm">{t(`errors.${errorCode}`)}</p>}

        {/* Submit button */}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : t('pages.register.form.submit_button')}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
