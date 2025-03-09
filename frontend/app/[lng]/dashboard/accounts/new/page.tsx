'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import NewAccountForm from './components/NewAccountForm';
import { Card, CardContent } from '@/components/ui/card';

/**
 * CreateAccountsPage
 */
const CreateAccountsPage: React.FC = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader lng={lng} title={t('pages.accounts.new.title')} />

      <section>
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <h2 className="text-lg font-semibold">{t('pages.accounts.new.title')}</h2>
            <p className="text-sm text-gray-400 mb-5">{t('pages.accounts.new.description')}</p>
            <NewAccountForm lng={lng} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CreateAccountsPage;
