import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseError } from '@/store/utils/parseError';
import { config } from '@/lib/config.client';
import { User } from './types';

const BASE_URL = `${config.apiBaseUrl}/users`;

/**
 * Fetch all users
 * GET /api/users
 */
export const fetchUsers = createAsyncThunk<User[]>('users/fetchAll', async () => {
  const res = await fetch(BASE_URL, { credentials: 'include' });
  if (!res.ok) throw new Error(await parseError(res));

  return (await res.json()) as User[];
});
