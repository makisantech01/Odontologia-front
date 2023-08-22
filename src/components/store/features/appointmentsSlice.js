import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const appointmentUrl = import.meta.env.VITE_APPOINTMETS_URL;
const initialState = {
  appointments: [],
};

export const getAppointments = createAsyncThunk(
  "appointment/getAppointments",
  async () => {
    const response = await axios(`${appointmentUrl}`);
    return response.data.data;
  }
);

export const deleteAppointments = createAsyncThunk(
  "appointments/deleteAppointments",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${appointmentUrl}/${id}`);
    dispatch(getAppointments());
    return response.data;
  }
);

export const cleanAppointments = createAsyncThunk(
  "appointments/cleanAppointments",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${appointmentUrl}/${id}`);
    dispatch(getAppointments());
    return response.data;
  }
);

export const postAppointment = createAsyncThunk(
  "appointments/postAppointment",
  async (payload, { dispatch }) => {
    const { dni, fecha, hora, estado } = payload;
    const clientDni = payload.dni;
    const response = await axios.post(
      `${appointmentUrl}/${clientDni}`,
      payload
    );
    dispatch(getAppointments());
    return response.data;
  }
);

export const AppointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
    builder.addCase(deleteAppointments.fulfilled, (state, action) => {
      Swal.fire("Turno eliminado con éxito!", "", "success");
    });
    builder.addCase(deleteAppointments.rejected, (state, action) => {
      Swal.fire(
        "Hubo un error al eliminar el turno, inténtelo nuevamente",
        "",
        "error"
      );
    });
    builder.addCase(postAppointment.fulfilled, (state, action) => {
      Swal.fire("Turno creado con exito", "", "success");
    });
    builder.addCase(postAppointment.rejected, (state, action) => {
      Swal.fire("Hubo un error al crear el turno", "", "error");
    });
  },
});

export default AppointmentSlice.reducer;
export const { actions: appointmentsAction, reducer: appointmentsReducer } =
  AppointmentSlice;
