import './globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import { getServerTranslation } from '../i18n';
import Layout from '@/components/layouts';
import Providers from '../../providers/Providers';
import { getLngFromParams } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

/**
 * Generates static parameters for dynamic language-based routing.
 */
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

/**
 * Generates metadata for each language version of the page.
 */
export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const lng = await getLngFromParams(params);
  const { t } = await getServerTranslation(lng, 'translation');

  return {
    title: t('title'),
    description: t('description'),
  };
}

/**
 * Root layout
 */
export default async function RootLayout({ children, params }: LayoutProps) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <body>
        <Providers>
          <Layout.Sidebar lng={lng}>{children}</Layout.Sidebar>
        </Providers>
      </body>
    </html>
  );
}
