import { configureStore } from '@reduxjs/toolkit'
import { config } from '@/lib/config.client'
import authReducer from './features/auth/authSlice'
import accountsReducer from './features/accounts/accountsSlice'
import transactionsReducer from './features/transactions/transactionsSlice'
import exchangeRatesReducer from './features/exchangeRates/exchangeRatesSlice'
import usersReducer from './features/users/usersSlice'
import dashboardStatsReducer from './features/stats/statsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
    exchangeRates: exchangeRatesReducer,
    users: usersReducer,
    dashboardStats: dashboardStatsReducer,
    // ...
  },
  devTools: config.nodeENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
