import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from './userAPI';

// First, create the thunk
const login = createAsyncThunk('user/loginStatus', async (params) => {
  const { user, password } = params;
  const response = await userAPI.login(user, password);
  return response.data;
});

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: 'idle',
    currentRequestId: undefined,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.user = action.payload.data;
          localStorage.setItem('token', action.payload.token);
          state.currentRequestId = undefined;
        }
      })
      .addCase(login.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  }
});

export { login };

export default userSlice.reducer;
