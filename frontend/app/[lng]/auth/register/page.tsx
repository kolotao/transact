'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import { KeyRound } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import { Separator } from '@/components/ui/separator';

/**
 * RegisterPage
 */
const RegisterPage = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader title={t('pages.register.meta.title')} lng={lng} isBreadcrumb={false}>
        <Button variant="outline" asChild>
          <Link href={`/${lng}/auth/login`}>
            <KeyRound /> {t('pages.register.login_button')}
          </Link>
        </Button>
      </PageHeader>

      <section>
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <RegistrationForm lng={lng} />
            <Separator className="mt-5 mb-2.5" />
            <div className="flex items-center">
              <p className="text-sm">{t('pages.register.ask_login')}</p>
              <Button variant="link" size="sm" asChild>
                <Link href={`/${lng}/auth/login`}>{t('pages.register.login_button')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default RegisterPage;
