'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import AccountsTable from './components/AccountsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

/**
 * AccountsPage
 */
const AccountsPage = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader lng={lng}>
        <Button variant="outline" asChild>
          <Link href={`/${lng}/dashboard/accounts/new`}>
            <Plus /> {t('pages.accounts.create_account_button')}
          </Link>
        </Button>
      </PageHeader>

      <section>
        <AccountsTable lng={lng} />
      </section>
    </>
  );
};

export default AccountsPage;
