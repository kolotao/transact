import { createSlice } from '@reduxjs/toolkit';
import { ExchangeRate } from './types';
import { fetchExchangeRates } from './exchangeRatesThunks';

interface ExchangeRatesState {
  list: ExchangeRate[];
  loading: boolean;
  errorCode: string | null;
}

const initialState: ExchangeRatesState = {
  list: [],
  loading: true,
  errorCode: null,
};

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    resetExchangeRatesState(state) {
      state.list = [];
      state.loading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
  },
});

export const { resetExchangeRatesState } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
