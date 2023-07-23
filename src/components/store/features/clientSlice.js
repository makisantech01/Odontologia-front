import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const pacientesUrl = import.meta.env.VITE_PATIENTS_URL;

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const response = await axios.get(pacientesUrl);
  return response.data;
});
export const fetchClient = createAsyncThunk(
  "selectedClient/fetch",
  async (dni) => {
    const response = await axios.get(`${pacientesUrl}/${dni}`);
    console.log("fetchClient ->", response.data.data);
    return response.data.data;
  }
);

export const createClient = createAsyncThunk(
  "userSlice/createClient",
  async (client) => {
    const response = await axios.post(`${pacientesUrl}/${client.dni}`, client);
    const responseData = response.data;
    return responseData;
  }
);

export const updateClient = createAsyncThunk(
  "userSlice/updateClient",
  async (client) => {
    const response = await axios.put(`${pacientesUrl}/${client.dni}`, client);
    const responseData = response.data;
    return responseData;
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    selectedClient: {},
  },
  reducers: {
    selectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      return action.payload;
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

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
