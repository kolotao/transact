import { Account } from '@/store/features/accounts/types';
import { FC } from 'react';
import { useTranslation } from '@/app/i18n/client';

interface AccountDetailsProps {
  lng: string;
  account: Account;
}

/**
 * Displays detailed account information.
 */
const AccountDetails: FC<AccountDetailsProps> = ({ lng, account }) => {
  const { t } = useTranslation(lng, 'translation');
  if (!account) return null;

  return (
    <div className="text-sm">
      <p>
        <strong>{t('pages.accounts.columns.id')}:</strong> {account.id}
      </p>
      <p>
        <strong>{t('pages.accounts.columns.currency')}:</strong> {account.currency}
      </p>
      <p>
        <strong>{t('pages.accounts.columns.balance')}:</strong> {account.balance}
      </p>
      <p>
        <strong>{t('pages.accounts.columns.created_at')}:</strong> {new Date(account.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AccountDetails;
