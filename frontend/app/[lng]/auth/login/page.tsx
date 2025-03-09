'use client';

import { PageHeader } from '@/components/headers/page/pageHeader';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';
import { UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LoginForm } from './components/LoginForm';

/**
 * LoginPage
 */
const LoginPage = () => {
  const { lng } = useParams() as { lng: string };
  const { t } = useTranslation(lng, 'translation');

  return (
    <>
      <PageHeader title={t('pages.login.meta.title')} lng={lng} isBreadcrumb={false}>
        <Button variant="outline" asChild>
          <Link href={`/${lng}/auth/register`}>
            <UserPlus /> {t('pages.login.register_button')}
          </Link>
        </Button>
      </PageHeader>

      <section>
        <Card className="max-w-2xl mx-auto">
          <CardContent>
            <LoginForm lng={lng} />
            <Separator className="mt-5 mb-2.5" />
            <div className="flex items-center">
              <p className="text-sm">{t('pages.login.ask_register')}</p>
              <Button variant="link" size="sm" asChild>
                <Link href={`/${lng}/auth/register`}>{t('pages.login.register_button')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default LoginPage;
