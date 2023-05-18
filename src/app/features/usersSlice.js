import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from '../../global/constants';
import { getUsers } from '../services/apiService';

const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.data = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error
      })
  },
});

export default usersSlice.reducer;