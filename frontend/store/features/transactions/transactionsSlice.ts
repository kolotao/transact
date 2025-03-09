import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from './types';
import { fetchTransactions, fetchTransactionById, fetchTransactionsByUser, transferFunds } from './transactionsThunks';

interface TransactionsState {
  list: Transaction[];
  current: Transaction | null;
  userTransactions: Transaction[]; // from fetchTransactionsByUser
  loading: boolean;
  errorCode: string | null;
}

const initialState: TransactionsState = {
  list: [],
  current: null,
  userTransactions: [],
  loading: true,
  errorCode: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionsState(state) {
      state.list = [];
      state.current = null;
      state.userTransactions = [];
      state.loading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======================
      // fetchTransactions
      // ======================
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
    // ======================
    // fetchTransactionById
    // ======================
    builder
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
    // ======================
    // fetchTransactionsByUser
    // ======================
    builder
      .addCase(fetchTransactionsByUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTransactions = action.payload;
      })
      .addCase(fetchTransactionsByUser.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
    // ======================
    // transferFunds
    // =================
    builder
      .addCase(transferFunds.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.loading = false;
        // We can optionally push the new transaction to `list`
        state.list.unshift(action.payload);
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
  },
});

export const { resetTransactionsState } = transactionsSlice.actions;

export default transactionsSlice.reducer;
