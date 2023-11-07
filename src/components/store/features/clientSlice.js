import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const editMedicalHistory = import.meta.env.VITE_MEDICAL_HISTORY_URL;
const pacientesUrl = import.meta.env.VITE_PATIENTS_URL;
const userUrl = import.meta.env.VITE_ENDPOINT;

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
    console.log("res",response.data);
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

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (dni, {dispatch}) => {
    const response = await axios.delete(`${pacientesUrl}/${dni}`)
    const responseUser = await axios.delete(`${userUrl}/usuarios/${dni}`)
    dispatch(fetchClients());
    console.log("esto es resposne user",responseUser)
    return response.data
  }
)

export const putHistorial = createAsyncThunk (
  "client/putHistorial",
  async(payload, {dispatch})=>{
    const {newPatientUpdates, pacienteDni, clientDni} = payload
    const id = clientDni
    const response = await axios.put(`${editMedicalHistory}/${pacienteDni}`,
      newPatientUpdates,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const fetch=await dispatch(fetchClient(id))
    console.log(fetch);
    console.log(response.data);
    return response.data
  }
)



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
      state.clients = action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
      cookies.set("selectedClient", JSON.stringify(action.payload), {
        path: "/datos",
      });
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.selectedClient = action.payload;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      Swal.fire(
        "El paciente se eliminó correctamente.",
        "",
        "success"
      );
    });
    builder.addCase(deleteClient.rejected, (state, action) => {
      Swal.fire(
        "Hubo un error al eliminar al paciente, intentelo nuevamente.",
        "",
        "error"
      );
    });
    builder.addCase(putHistorial.fulfilled, (state, action) =>{
      Swal.fire(
        "El historial del paciente se modificó correctamente.",
        "",
        "success"
      );
    })
    builder.addCase(putHistorial.rejected, (state, action) =>{
      Swal.fire(
        "Hubo un error al modificar el historial del paciente.",
        "",
        "error"
      );
    })
  },
});

export const clientSelector = (state) => state?.clients?.selectedClient;
export const clientsSelector = (state) => state?.clients?.clients;

export const { actions: clientActions, reducer: clientReducer } = clientSlice;
