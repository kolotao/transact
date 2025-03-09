'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import DashboardStatsBlock from './components/DashboardStatsBlock';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { KeyRound, UserPlus } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

/**
 * DashboardPage
 */
const DashboardPage = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <PageHeader lng={lng}>
        {!user && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/${lng}/auth/login`}>
                <KeyRound /> {t('pages.dashboard.login_button')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${lng}/auth/register`}>
                <UserPlus /> {t('pages.dashboard.register_button')}
              </Link>
            </Button>
          </div>
        )}
      </PageHeader>

      <section>
        <DashboardStatsBlock lng={lng} />
      </section>
    </>
  );
};

export default DashboardPage;
