'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccounts } from '@/store/features/accounts/accountsThunks';
import { Columns } from './columns';
import { Account } from '@/store/features/accounts/types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useTranslation } from '@/app/i18n/client';
import { createSelector } from '@reduxjs/toolkit';
import { Loader } from '@/components/ui/loader';

interface AccountsTableProps {
  lng: string;
}

/**
 * Memoized selector to prevent unnecessary re-renders
 */
const selectAccountsData = createSelector(
  (state) => state.accounts.list,
  (state) => state.accounts.loading,
  (state) => state.accounts.errorCode,
  (list, loading, errorCode) => ({ data: list, loading, errorCode })
);

/**
 * AccountsTable fetches and displays the user's accounts using Redux
 */
const AccountsTable: React.FC<AccountsTableProps> = ({ lng }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(lng, 'translation');

  const { data: accounts, loading, errorCode } = useAppSelector(selectAccountsData);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (errorCode) {
    return (
      <div className="text-sm text-red-500">
        {t(`errors.${errorCode}`)} <br />
        <Button onClick={() => dispatch(fetchAccounts())} className="mt-2">
          {t('pages.accounts.retry_button')}
        </Button>
      </div>
    );
  }

  const data: Account[] = accounts || [];

  return (
    <DataTable
      columns={Columns(t, lng)}
      data={data}
      filter={{ value: 'currency', placeholder: t('pages.accounts.search_currency') }}
    />
  );
};

export default AccountsTable;
