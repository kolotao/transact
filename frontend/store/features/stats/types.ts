/**
 * Stats state
 * @interface Stats
 * @property {number} totalUsers - Total number of users
 * @property {number} totalTransactions - Total number of transactions
 * @property {number} totalAccounts - Total number of accounts
 */
export interface Stats {
    totalUsers: number;
    totalTransactions: number;
    totalAccounts: number;
}