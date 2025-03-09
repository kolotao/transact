import { ReactNode } from 'react';
import { getServerTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
import { requireAuth } from '@/lib/requireAuth';
import { getLngFromParams } from '@/lib/utils';
import type { Metadata } from 'next';

interface LayoutProps {
  children: ReactNode;
  params: { lng: string };
}

/**
 * Generates static language-based parameters for dynamic routing.
 */
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

/**
 * Generates metadata for the transactions dashboard page.
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const lng = await getLngFromParams(params);
  const { t } = await getServerTranslation(lng, 'translation');

  return {
    title: t('pages.transactions.meta.title'),
    description: t('pages.transactions.meta.description'),
  };
}

/**
 * Layout component for the transactions dashboard.
 * Ensures authentication before rendering content.
 */
export default async function Layout({ children, params }: LayoutProps) {
  const lng = await getLngFromParams(params);
  await requireAuth(lng);

  return children;
}
