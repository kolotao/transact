'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import TransactionsTable from './components/TransactionsTable';

/**
 * TransactionsPage component displays a list of transactions
 * and provides an option to create a new transaction.
 */
const TransactionsPage: React.FC = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader lng={lng}>
        <Button variant="outline" asChild>
          <Link href={`/${lng}/dashboard/transactions/new`}>
            <Plus /> {t('pages.transactions.create_trx_button')}
          </Link>
        </Button>
      </PageHeader>

      <section>
        <TransactionsTable lng={lng} />
      </section>
    </>
  );
};

export default TransactionsPage;
