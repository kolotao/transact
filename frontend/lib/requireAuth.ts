// lib/serverAuth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { config } from '@/lib/config.client';
import { User } from '@/store/features/users/types';

/**
 * Fetches the currently authenticated user from the Adonis backend.
 * If no user is found (not logged in), automatically redirects to /[lng]/auth/login.
 *
 * @param lng The current locale, to build the correct redirect URL
 * @returns The user object (if authorized)
 */
export const requireAuth = async (lng: string): Promise<User | undefined> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const meRes = await fetch(`${config.apiBaseUrl}/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!meRes.ok) redirect(`/${lng}/auth/login`);

  const data = (await meRes.json()) as { user: User };
  return data.user;
};
