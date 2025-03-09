import { Transaction } from "../transactions/types"

/**
 * Currency type, reflecting the Adonis Account model (`USD | EUR | JPY`).
 */
export type Currency = 'USD' | 'EUR' | 'JPY'

/**
 * The Account model interface, matching the backend response.
 * 
 * - `id`: string (UUID)
 * - `ownerId`: string (because the backend stores user.id as string/UUID)
 * - `currency`: 'USD' | 'EUR' | 'JPY'
 * - `balance`: numeric balance
 * - `createdAt` / `updatedAt`: strings in ISO format
 */
export interface Account {
  id: string
  ownerId: string
  currency: Currency
  balance: number
  createdAt: string
  updatedAt: string
  outgoingTransactions: Transaction[]
  incomingTransactions: Transaction[]
}

/**
 * Payload for creating a new account.
 * 
 * The backend doesn't require `ownerId` in the request body,
 * because it uses the authenticated user. The controller sets `balance = 0`
 * and may deposit 100 automatically from the "bank@example.com" account.
 */
export interface CreateAccountPayload {
  currency: Currency
}

/**
 * Payload for updating an existing account.
 * 
 * The controller only updates the `currency` field.
 */
export interface UpdateAccountPayload {
  id: string
  currency: Currency
}

/**
 * Since the backend uses "delete /api/accounts/:id" with no request body,
 * we just pass the account ID as a string in the thunk.
 */
export type DeleteAccountPayload = string
