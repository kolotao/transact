'use client';

import React, { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTransactions, transferFunds } from '@/store/features/transactions/transactionsThunks';
import { useRouter } from 'next/navigation';
import { fetchAccounts } from '@/store/features/accounts/accountsThunks';
import { fetchExchangeRates } from '@/store/features/exchangeRates/exchangeRatesThunks';
import { useTranslation } from '@/app/i18n/client';
import { ExchangeRate } from '@/store/features/exchangeRates/types';

/**
 * Generates a validation schema using the translation function.
 */
const makeSchema = (t: (key: string) => string) =>
  z.object({
    fromAccountId: z.string().nonempty(t('pages.transactions.new.form.errors.from_account')),
    toAccountId: z.string().nonempty(t('pages.transactions.new.form.errors.to_account')),
    amount: z.coerce.number().min(1, t('pages.transactions.new.form.errors.amount')),
    description: z.string().optional(),
  });

type NewSchema = ReturnType<typeof makeSchema>['_type'];

interface NewTransactionFormProps {
  lng: string;
}

/**
 * Converts an amount from one currency to another using exchange rates.
 */
const convertAmount = (
  exchangeRates: ExchangeRate[],
  fromCurrency: string,
  toCurrency: string,
  amount: number
): number => {
  if (fromCurrency === toCurrency) return amount;

  const rate = exchangeRates.find((rate) => rate.fromCurrency === fromCurrency && rate.toCurrency === toCurrency);
  return rate ? amount * rate.rate : NaN;
};

/**
 * Form for creating a new transaction.
 */
const NewTransactionForm: React.FC<NewTransactionFormProps> = ({ lng }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, 'translation');

  const { loading, errorCode } = useAppSelector((state) => state.transactions);
  const accounts = useAppSelector((state) => state.accounts.list);
  const exchangeRates = useAppSelector((state) => state.exchangeRates.list);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchAccounts());
    dispatch(fetchExchangeRates());
  }, [dispatch]);

  const newSchema = makeSchema(t);

  const form = useForm<NewSchema>({
    resolver: zodResolver(newSchema),
    defaultValues: {
      fromAccountId: '',
      toAccountId: '',
      amount: 1,
      description: '',
    },
  });

  const { watch } = form;
  const fromAccountId = watch('fromAccountId');
  const amount = watch('amount');
  const toAccountId = watch('toAccountId');

  const fromAccount = useMemo(
    () => accounts.find((acc) => acc.id === fromAccountId) || null,
    [accounts, fromAccountId]
  );

  const toAccount = useMemo(() => accounts.find((acc) => acc.id === toAccountId) || null, [accounts, toAccountId]);

  const convertedInfo = useMemo(() => {
    if (!fromAccount || !toAccount) return null;

    if (fromAccount.currency === toAccount.currency) {
      return t('pages.transactions.new.form.same_currency', {
        amount,
        currency: fromAccount.currency,
      });
    }

    const converted = convertAmount(exchangeRates, fromAccount.currency, toAccount.currency, amount);
    return isNaN(converted)
      ? t('pages.transactions.new.form.exchange_rate_error')
      : t('pages.transactions.new.form.converted_info', {
          amount,
          fromCurrency: fromAccount.currency,
          converted,
          toCurrency: toAccount.currency,
        });
  }, [fromAccount, toAccount, amount, exchangeRates, t]);

  const onSubmit = async (values: NewSchema) => {
    const result = await dispatch(transferFunds(values));
    if (transferFunds.fulfilled.match(result)) {
      router.push(`/${lng}/dashboard/transactions`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fromAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.transactions.new.form.from_account')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('pages.transactions.new.form.select_account')} />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id}>
                        {acc.id} - {acc.currency} ({t('pages.transactions.new.form.balance')}: {acc.balance})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.transactions.new.form.to_account')}</FormLabel>
              <FormControl>
                <Input placeholder={t('pages.transactions.new.form.to_account_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pages.transactions.new.form.amount')}</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {convertedInfo && <div className="text-xs text-gray-500">{convertedInfo}</div>}

        {errorCode && <p className="text-red-500 text-sm">{t(`errors.${errorCode}`)}</p>}

        <Button type="submit" disabled={loading}>
          {t('pages.transactions.new.form.submit_button')}
        </Button>
      </form>
    </Form>
  );
};

export default NewTransactionForm;
