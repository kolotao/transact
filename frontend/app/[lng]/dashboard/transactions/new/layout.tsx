import { ReactNode } from 'react';
import { getServerTranslation } from '@/app/i18n';
import { languages } from '@/app/i18n/settings';
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
 * Generates metadata for the "Create New Transaction" page.
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const lng = await getLngFromParams(params);
  const { t } = await getServerTranslation(lng, 'translation');

  return {
    title: t('pages.transactions.new.meta.title'),
    description: t('pages.transactions.new.meta.description'),
  };
}

/**
 * Layout component for the "Create New Transaction" page.
 */
export default function Layout({ children }: LayoutProps) {
  return children;
}
