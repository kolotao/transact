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
 * Generates metadata for the registration page.
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const lng = await getLngFromParams(params);
  const { t } = await getServerTranslation(lng, 'translation');

  return {
    title: t('pages.register.meta.title'),
    description: t('pages.register.meta.description'),
  };
}

/**
 * Layout component for the registration page.
 */
export default function Layout({ children }: LayoutProps) {
  return children;
}
