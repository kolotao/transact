'use client';

import { DataTable } from '@/components/ui/data-table';
import { useTranslation } from '@/app/i18n/client';
import { Columns } from './columns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { fetchTransactions } from '@/store/features/transactions/transactionsThunks';
import { useEffect } from 'react';
import { Transaction } from '@/store/features/transactions/types';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

interface TransactionsTableProps {
  lng: string;
}

/**
 * Memoized selector to prevent unnecessary re-renders.
 */
const selectData = createSelector(
  (state) => state.transactions.list,
  (state) => state.transactions.loading,
  (state) => state.transactions.errorCode,
  (list, loading, errorCode) => ({ list, loading, errorCode })
);

/**
 * TransactionsTable component fetches and displays the user's transactions
 * using Redux state and DataTable.
 */
const TransactionsTable: React.FC<TransactionsTableProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'translation');
  const dispatch = useAppDispatch();

  const { list, loading, errorCode } = useAppSelector(selectData);

  useEffect(() => {
    dispatch(fetchTransactions());
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
        <Button onClick={() => dispatch(fetchTransactions())} className="mt-2">
          {t('pages.transactions.retry_button')}
        </Button>
      </div>
    );
  }

  const data: Transaction[] = list || [];

  return <DataTable columns={Columns(t)} data={data} />;
};

export default TransactionsTable;
