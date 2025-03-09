'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import NewTransactionForm from './components/NewTransactionForm';
import { Card, CardContent } from '@/components/ui/card';

/**
 * NewTransactionPage
 */
const NewTransactionPage: React.FC = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader lng={lng} title={t('pages.transactions.new.title')} />

      <section>
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <NewTransactionForm lng={lng} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default NewTransactionPage;
