import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/requireAuth';
import { fallbackLng, languages } from '../i18n/settings';

interface HomePageProps {
  params: {
    lng: string;
  };
}

/**
 * Redirects the user to the dashboard if authenticated, otherwise to the login page.
 */
export default async function HomePage({ params }: HomePageProps) {
  let { lng } = await params;

  // Validate and fallback to a default language if necessary
  if (!languages.includes(lng)) {
    lng = fallbackLng;
  }

  // Check if the user is authenticated
  const user = await requireAuth(lng);

  // Redirect to the dashboard if authenticated
  if (user) {
    redirect(`/${lng}/dashboard`);
  }
}
