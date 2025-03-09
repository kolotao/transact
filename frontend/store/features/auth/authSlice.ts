import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, fetchCurrentUser } from './authThunks';
import { User } from '../users/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  errorCode: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  errorCode: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = null;
      state.loading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ======================
      // registerUser
      // ======================
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });

    builder
      // ======================
      // loginUser
      // =================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
    builder
      // ======================
      // logoutUser
      // ======================
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
    // ======================
    // fetchCurrentUser
    // =================
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        // If we get 401 or 403, that means not logged in
        state.user = null;
        state.errorCode = action.error.message || null;
        // optionally do nothing, e.g. user can remain null
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
