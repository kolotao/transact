import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Account, CreateAccountPayload, UpdateAccountPayload, DeleteAccountPayload } from './types'
import { config } from '@/lib/config.client'
import { parseError } from '@/store/utils/parseError'

const BASE_URL = `${config.apiBaseUrl}/accounts`

/**
 * Fetch the list of all accounts for the authenticated user.
 * GET /api/accounts
 * Returns an array of Account objects.
 * @throws Error if the request fails.
 * @returns Promise<Account[]>
 */
export const fetchAccounts = createAsyncThunk<Account[]>(
  'accounts/fetchAccounts',
  async () => {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      credentials: 'include', // needed for session cookies
    })
    if (!response.ok) throw new Error(await parseError(response))

    return (await response.json()) as Account[]
  }
)

/**
 * Fetch a single account by its ID.
 * GET /api/accounts/:id
 */
export const fetchAccountById = createAsyncThunk<Account, string>(
  'accounts/fetchAccountById',
  async (accountId) => {
    const url = `${BASE_URL}/${accountId}`

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(await parseError(response))

    return (await response.json()) as Account
  }
)

/**
 * Create a new account.
 * POST /api/accounts
 */
export const createAccount = createAsyncThunk<Account, CreateAccountPayload>(
  'accounts/createAccount',
  async (payload) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(await parseError(response))

    return (await response.json()) as Account
  }
)

/**
 * Update an existing account (mainly the currency).
 * PUT /api/accounts/:id
 */
export const updateAccount = createAsyncThunk<Account, UpdateAccountPayload>(
  'accounts/updateAccount',
  async ({ id, currency }) => {
    const url = `${BASE_URL}/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency }),
    })
    if (!response.ok) throw new Error(await parseError(response))

    return (await response.json()) as Account
  }
)

/**
 * Delete an account by ID.
 * DELETE /api/accounts/:id
 * Returns null (or 204 with empty body) on success.
 */
export const deleteAccount = createAsyncThunk<string, DeleteAccountPayload>(
  'accounts/deleteAccount',
  async (accountId) => {
    const url = `${BASE_URL}/${accountId}`
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(await parseError(response))

    // Return the ID so we can remove it from store
    return accountId
  }
)
