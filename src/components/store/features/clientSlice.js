import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";

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
    const responseData = response.data;
    return responseData;
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (client) => {
    const response = await axios.put(`${pacientesUrl}/${client.dni}`, client);
    const responseData = response.data;
    return responseData;
  }
);

const initialState = {
  clients: [],
  selectedClient: {},
};

const clientSlice = createSlice({
  name: "clients",
  initialState: getLocalStorage("client")
    ? getLocalStorage("client")
    : initialState,
  reducers: {
    selectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      setLocalStorage("client", state.clients);
      return action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      setLocalStorage("client", state.selectedClient);
      return action.payload;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      setLocalStorage("client", state.selectedClient);
      return action.payload;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      setLocalStorage("client", state.selectedClient);
      return action.payload;
    });
  },
});

export const clientSelector = (state) => state?.clients?.selectedClient;

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
