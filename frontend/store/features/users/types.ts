import { Account } from '../accounts/types';

/**
 * User interface, reflecting the backend's User model.
 *
 * The backend uses:
 * - id: string (UUID)
 * - firstName / lastName
 * - email
 * - createdAt / updatedAt
 */
export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
}
