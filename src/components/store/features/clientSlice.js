import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const pacientesUrl = import.meta.env.VITE_PATIENTS_URL;

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const response = await axios.get(pacientesUrl);
  return response.data;
});
export const fetchClient = createAsyncThunk("clients/fetch", async (dni) => {
  const response = await axios.get(`${pacientesUrl}/${dni}`);
  return response.data;
});

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    selectedClient: null,
  },
  reducers: {
    selectClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
