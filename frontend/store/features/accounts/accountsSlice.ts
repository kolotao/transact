import { createSlice } from '@reduxjs/toolkit'
import { Account } from './types'
import {
  fetchAccounts,
  fetchAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from './accountsThunks'

interface AccountsState {
  list: Account[]
  current: Account | null
  loading: boolean
  errorCode: string | null
}

const initialState: AccountsState = {
  list: [],
  current: null,
  loading: true,
  errorCode: null,
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetAccountsState(state) {
      state.list = []
      state.current = null
      state.loading = false
      state.errorCode = null
    },
  },
  extraReducers: (builder) => {
    builder

      // ======================
      // fetchAccounts
      // ======================
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })

      // ======================
      // fetchAccountById
      // ======================
      .addCase(fetchAccountById.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })

      // ======================
      // createAccount
      // ======================
      .addCase(createAccount.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false
        // Add the newly created account to the list
        state.list.push(action.payload)
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })

      // ======================
      // updateAccount
      // ======================
      .addCase(updateAccount.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload
        // Update the item in `list`
        const idx = state.list.findIndex((acc) => acc.id === updated.id)
        if (idx >= 0) {
          state.list[idx] = updated
        }
        // If the current account is the same one, update it too
        if (state.current && state.current.id === updated.id) {
          state.current = updated
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })

      // ======================
      // deleteAccount
      // ======================
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false
        const deletedId = action.payload
        state.list = state.list.filter((acc) => acc.id !== deletedId)
        // If `current` was the deleted account, reset it
        if (state.current && state.current.id === deletedId) {
          state.current = null
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })
  },
})

export const { resetAccountsState } = accountsSlice.actions

export default accountsSlice.reducer
