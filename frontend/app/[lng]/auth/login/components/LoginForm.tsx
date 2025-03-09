'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/features/auth/authThunks';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Loader } from 'lucide-react';


function makeLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().email({ message: t('pages.login.form.errors.email') }),
    password: z.string().min(4, { message: t('pages.login.form.errors.password_length') }),
  });
}

type LoginSchema = ReturnType<typeof makeLoginSchema>['_type'];

export function LoginForm({ lng }: { lng: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, 'translation');

  const { loading, errorCode } = useAppSelector((state) => state.auth);

  const loginSchema = makeLoginSchema(t)

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const result = await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      router.push(`/${lng}/dashboard`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.login.form.email')}</FormLabel>
              <FormControl>
                <Input placeholder="name@transact.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.login.form.password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* If there's a global error from Redux (e.g. INVALID_CREDENTIALS) */}
        {errorCode && <p className="text-red-500 text-sm">{t(`errors.${errorCode}`)}</p>}

        {/* Submit button */}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : t('pages.login.form.submit_button')}
        </Button>
      </form>
    </Form>
  );
}
