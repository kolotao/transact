import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseError } from '@/store/utils/parseError';
import { config } from '@/lib/config.client';
import { ExchangeRate } from './types';

const BASE_URL = `${config.apiBaseUrl}/exchange-rates`;

/**
 * Fetch all exchange rates.
 * GET /api/exchange-rates
 */
export const fetchExchangeRates = createAsyncThunk<ExchangeRate[]>('exchangeRates/fetchAll', async () => {
  const res = await fetch(BASE_URL, { credentials: 'include' });
  if (!res.ok) throw new Error(await parseError(res));

  return (await res.json()) as ExchangeRate[];
});
