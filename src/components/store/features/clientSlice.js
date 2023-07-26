import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const pacientesUrl = import.meta.env.VITE_PATIENTS_URL;

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const response = await axios.get(pacientesUrl);
  return response.data;
});

export const fetchClient = createAsyncThunk("client/fetch", async (dni) => {
  const response = await axios.get(`${pacientesUrl}/${dni}`);
  return response.data;
});

export const createClient = createAsyncThunk(
  "client/createClient",
  async (client) => {
    const response = await axios.post(`${pacientesUrl}/${client.dni}`, client);
    return response.data;
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (client) => {
    const response = await axios.put(`${pacientesUrl}/${client.dni}`, client);
    return response.data;
  }
);

const initialState = {
  clients: [],
  selectedClient: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setselectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
  },
});

export const clientSelector = (state) => state?.clients?.selectedClient;
export const clientsSelector = (state) => state?.clients?.clients;

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
