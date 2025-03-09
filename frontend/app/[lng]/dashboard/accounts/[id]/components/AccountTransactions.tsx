'use client';

import { Columns } from './columns';
import { Account } from '@/store/features/accounts/types';
import { DataTable } from '@/components/ui/data-table';
import { useTranslation } from '@/app/i18n/client';
import { Separator } from '@/components/ui/separator';

interface AccountTransactionsProps {
  lng: string;
  account: Account;
}

/**
 * Displays incoming and outgoing transactions for the account.
 */
const AccountTransactions: React.FC<AccountTransactionsProps> = ({ lng, account }) => {
  const { t } = useTranslation(lng, 'translation');

  return (
    <div>
      {/* Incoming Transactions */}
      <p className="mb-4">{t('pages.accounts.account.incoming_trx')}</p>
      {account?.incomingTransactions?.length ? (
        <DataTable columns={Columns(t)} data={account.incomingTransactions} />
      ) : (
        <p>{t('pages.accounts.account.no_incoming_trx')}</p>
      )}

      <Separator className="my-10" />

      {/* Outgoing Transactions */}
      <p className="mb-4">{t('pages.accounts.account.outgoing_trx')}</p>
      {account?.outgoingTransactions?.length ? (
        <DataTable columns={Columns(t)} data={account.outgoingTransactions} />
      ) : (
        <p>{t('pages.accounts.account.no_outgoing_trx')}</p>
      )}
    </div>
  );
};

export default AccountTransactions;
