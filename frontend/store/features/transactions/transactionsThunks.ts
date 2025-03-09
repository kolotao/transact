import { createAsyncThunk } from '@reduxjs/toolkit';
import { parseError } from '@/store/utils/parseError';
import { config } from '@/lib/config.client';
import type { Transaction, TransferPayload, FetchByUserPayload } from './types';

const BASE_URL = `${config.apiBaseUrl}/transactions`;

/**
 * Fetch all transactions for the current authenticated user.
 * GET /api/transactions
 */
export const fetchTransactions = createAsyncThunk<Transaction[]>('transactions/fetchAll', async () => {
  const response = await fetch(BASE_URL, { credentials: 'include' });
  if (!response.ok) throw new Error(await parseError(response));

  return (await response.json()) as Transaction[];
});

/**
 * Fetch a single transaction by ID.
 * GET /api/transactions/:id
 */
export const fetchTransactionById = createAsyncThunk<Transaction, string>(
  'transactions/fetchOne',
  async (transactionId) => {
    const url = `${BASE_URL}/${transactionId}`;
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) throw new Error(await parseError(response));

    return (await response.json()) as Transaction;
  }
);

/**
 * Fetch transactions by user ID (GET /api/transactions/get-by-user/:id).
 * This might be used by an admin or some special route.
 *
 * We return Transaction[], or we might do something else (like store them in a separate field).
 */
export const fetchTransactionsByUser = createAsyncThunk<Transaction[], FetchByUserPayload>(
  'transactions/fetchByUser',
  async (userId) => {
    const url = `${BASE_URL}/get-by-user/${userId}`;
    const response = await fetch(url, { credentials: 'include' });
    if (!response.ok) throw new Error(await parseError(response));

    return (await response.json()) as Transaction[];
  }
);

/**
 * Transfer funds between two accounts (POST /api/transactions/transfer).
 * The result is a new Transaction object.
 */
export const transferFunds = createAsyncThunk<Transaction, TransferPayload>(
  'transactions/transferFunds',
  async (payload) => {
    const url = `${BASE_URL}/transfer`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(await parseError(response));

    return (await response.json()) as Transaction;
  }
);
