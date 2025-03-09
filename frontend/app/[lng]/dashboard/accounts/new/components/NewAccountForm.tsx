'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createAccount } from '@/store/features/accounts/accountsThunks';
import { useRouter } from 'next/navigation';
import { Currency } from '@/store/features/accounts/types';
import { useTranslation } from '@/app/i18n/client';
import { Loader } from '@/components/ui/loader';

interface NewAccountFormProps {
  lng: string;
}

/**
 * Generates a Zod schema for account creation validation.
 */
const makeSchema = (t: (key: string) => string) =>
  z.object({
    currency: z.enum(['USD', 'EUR', 'JPY'], {
      errorMap: () => ({ message: t('pages.accounts.new.form.errors.currency') }),
    }),
  });

type NewSchema = ReturnType<typeof makeSchema>['_type'];

/**
 * NewAccountForm handles the creation of a new user account.
 */
const NewAccountForm: React.FC<NewAccountFormProps> = ({ lng }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, 'translation');

  const { loading, errorCode } = useAppSelector((state) => state.accounts);
  const newSchema = makeSchema(t);

  // Setup react-hook-form with Zod validation
  const form = useForm<NewSchema>({
    resolver: zodResolver(newSchema),
    defaultValues: {
      currency: 'USD',
    },
  });

  /**
   * Handles the form submission and triggers the account creation process.
   */
  const onSubmit = async (values: NewSchema) => {
    const result = await dispatch(createAccount({ currency: values.currency }));
    if (createAccount.fulfilled.match(result)) {
      router.push(`/${lng}/dashboard/accounts`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Currency Selection */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.accounts.new.form.currency')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={(val: Currency) => field.onChange(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('pages.accounts.new.form.select_currency')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {errorCode && <p className="text-red-500 text-sm">{t(`errors.${errorCode}`)}</p>}

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : t('pages.accounts.new.form.submit_button')}
        </Button>
      </form>
    </Form>
  );
};

export default NewAccountForm;
