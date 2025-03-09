import { Account, Currency } from "../accounts/types"

/**
 * The base Transaction model as returned by the backend.
 *
 * Note:
 * - fromAccountId/toAccountId are string UUIDs.
 * - currency is a string. On the backend it's type: "USD" | "EUR" | "JPY", but it
 *   might be any string if you have more. We'll keep it string for flexibility.
 * - createdAt / updatedAt: we store them as string (ISO date) for the client side.
 */
export interface Transaction {
    id: string
    fromAccountId: string
    toAccountId: string
    amount: number
    currency: Currency
    description?: string
    createdAt: string
    updatedAt: string
  
    fromAccount: Account
    toAccount: Account
  }
  
  /**
   * Payload for making a funds transfer.
   * Corresponds to POST /api/transactions/transfer
   *
   * fromAccountId: user's account from which we want to transfer
   * toAccountId: account to which funds are sent (could belong to any user)
   * amount: numeric
   * currency: string (ex: "USD", "EUR", "JPY")
   * description: optional text
   */
  export interface TransferPayload {
    fromAccountId: string
    toAccountId: string
    amount: number
    currency?: Currency
    description?: string
  }
  
  /**
   * Sometimes we might need to fetch transactions by user ID
   * (GET /api/transactions/get-by-user/:id)
   * Here we just accept a string userId.
   */
  export type FetchByUserPayload = string
  