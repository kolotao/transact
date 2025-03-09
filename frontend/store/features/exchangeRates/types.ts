/**
 * ExchangeRate model as returned by the backend.
 * The table "exchange_rates" has e.g. { id, fromCurrency, toCurrency, rate, createdAt, updatedAt }
 */
export interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}
