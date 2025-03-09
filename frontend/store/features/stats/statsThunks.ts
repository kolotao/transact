import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseError } from '@/store/utils/parseError';
import { config } from '@/lib/config.client';

const BASE_URL = `${config.apiBaseUrl}/stats`;

export interface DashboardStats {
  totalUsers: number;
  totalTransactions: number;
  totalAccounts: number;
}

/**
 * Fetch basic dashboard statistics
 */
export const fetchDashboardStats = createAsyncThunk<DashboardStats>('dashboard/fetchStats', async () => {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await parseError(res));

  return (await res.json()) as DashboardStats;
});
