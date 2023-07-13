import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const AppointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
  },
});

export default AppointmentSlice.reducer;
export const { actions: appointmentsAction, reducer: appointmentsReducer } =
  AppointmentSlice;
