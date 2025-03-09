import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './usersThunks';
import { User } from './types';

interface UsersState {
  list: User[];
  loading: boolean;
  errorCode: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  errorCode: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUsersState(state) {
      state.list = [];
      state.loading = false;
      state.errorCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.errorCode = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorCode = action.error.message || 'UNEXPECTED_ERROR';
      });
  },
});

export const { resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;
