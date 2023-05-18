import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './features/invoicesSlice';
import usersReducer from './features/usersSlice';
import authReducer from './features/authSlice';

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    users: usersReducer,
    auth: authReducer
  },
});

export default store;