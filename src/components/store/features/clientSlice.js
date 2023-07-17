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
    return response.data;
  }
);

export const getUserById = createAsyncThunk(
  "userSlice/getUserById",
  async (payload) => {
    const response = await axios.get(`${pacientesUrl}/${payload}`);
    const responseData = response.data;
    console.log("getUserById ->", responseData);
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
  },
});

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
