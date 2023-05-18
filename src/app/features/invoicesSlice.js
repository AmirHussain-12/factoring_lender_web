import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from '../../global/constants';
import { assignInvoice, createInvoice, getInvoices, updateInvoice } from '../services/apiService';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getInvoices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = action.error
      })
      .addCase(createInvoice.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        state.data.push(action.payload)
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = action.error
      })
      .addCase(assignInvoice.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(assignInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        const invoiceIndex = state.data.findIndex(invoice => invoice.id === action.payload.id)
        if(invoiceIndex !== -1){
          state.data[invoiceIndex].lender = action.payload.lender
        }
      })
      .addCase(assignInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = action.error
      })
      .addCase(updateInvoice.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.isLoading = false
        const invoiceIndex = state.data.findIndex(invoice => invoice.id === action.payload.id)
        if(invoiceIndex !== -1){
          state.data[invoiceIndex].status = action.payload.status
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = action.error
      })
  },
});

export default invoicesSlice.reducer;