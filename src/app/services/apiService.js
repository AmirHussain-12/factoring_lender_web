import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../config/axios";
import { API_URL } from "../../global/constants";
import { loginFailure, loginStart, loginSuccess } from "../features/authSlice";

export const createInvoice = createAsyncThunk('invoices/create', async (invoiceData) => {
  const response = await Axios.post(API_URL.invoices, invoiceData);
  return response.data;
});

export const updateInvoice = createAsyncThunk('invoices/update', async (invoiceData) => {
  const response = await Axios.put(`${API_URL.invoices}/${invoiceData.id}`, invoiceData);
  return response.data;
});

export const getInvoices = createAsyncThunk('invoices', async (params) => {
  const response = await Axios.get(API_URL.invoices, { params });
  return response.data;
});

export const assignInvoice = createAsyncThunk('assignInvoice', async (invoiceData) => {
  const response = await Axios.patch(`${API_URL.invoices}/${invoiceData.id}/assign_invoice`, invoiceData);
  return response.data;
});

export const getUsers = createAsyncThunk('users', async (params) => {
  const response = await Axios.get(API_URL.users, { params });
  return response.data;
});