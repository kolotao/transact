'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { fetchAccountById } from '@/store/features/accounts/accountsThunks';
import { Loader } from '@/components/ui/loader';
import { createSelector } from '@reduxjs/toolkit';
import AccountTransactions from './components/AccountTransactions';
import { Account } from '@/store/features/accounts/types';
import { shortId } from '@/lib/utils';
import AccountDetails from './components/AccountDetails';
import { Separator } from '@/components/ui/separator';

/**
 * Memoized selector for fetching account details.
 */
const selectData = createSelector(
  (state) => state.accounts.current,
  (state) => state.accounts.loading,
  (state) => state.accounts.errorCode,
  (current, loading, errorCode) => ({ current, loading, errorCode })
);

/**
 * AccountPage component displays account details and transactions.
 */
const AccountPage: React.FC = () => {
  const { lng, id } = useParams() as { lng: string; id: string };
  const { t } = useTranslation(lng, 'translation');
  const dispatch = useAppDispatch();
  const { current, loading, errorCode } = useAppSelector(selectData);

  useEffect(() => {
    if (id) dispatch(fetchAccountById(id));
  }, [dispatch, id]);

  const renderHeader = () => (
    <PageHeader lng={lng} title={shortId(id)}>
      <Button variant="outline" asChild>
        <Link href={`/${lng}/dashboard/accounts/new`}>
          <Edit /> {t('pages.accounts.account.edit_account_button')}
        </Link>
      </Button>
    </PageHeader>
  );

  if (loading) {
    return (
      <>
        {renderHeader()}
        <section className="flex justify-center">
          <Loader />
        </section>
      </>
    );
  }

  if (errorCode) {
    return (
      <>
        {renderHeader()}
        <section className="text-sm text-red-500">
          {t(`errors.${errorCode}`)} <br />
          <Button onClick={() => dispatch(fetchAccountById(id))} className="mt-2">
            {t('pages.accounts.retry_button')}
          </Button>
        </section>
      </>
    );
  }

  return (
    <>
      {renderHeader()}
      <section>
        <AccountDetails lng={lng} account={current as Account} />
        <Separator className="my-10" />
        <AccountTransactions lng={lng} account={current as Account} />
      </section>
    </>
  );
};

export default AccountPage;
