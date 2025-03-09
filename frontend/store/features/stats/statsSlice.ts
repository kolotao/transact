// store/features/dashboard/dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDashboardStats, DashboardStats } from './statsThunks'

interface DashboardState {
  stats: DashboardStats | null
  loading: boolean
  errorCode: string | null
}

const initialState: DashboardState = {
  stats: null,
  loading: true,
  errorCode: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardState(state) {
      state.stats = null
      state.loading = false
      state.errorCode = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.errorCode = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR'
      })
  },
})

export const { resetDashboardState } = dashboardSlice.actions
export default dashboardSlice.reducer
