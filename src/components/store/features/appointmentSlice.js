import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appointmentData: {},
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    getDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDataSuccess(state, action) {
      state.appointmentData = action.payload;
      state.loading = false;
      state.error = null;
    },
    getDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getDataStart, getDataSuccess, getDataFailure } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;

const appointmentDays = import.meta.env.VITE_APPOINTMENT_URL;
export const fetchAppointments = () => async (dispatch) => {
  dispatch(getDataStart());
  try {
    const response = await axios.get(appointmentDays);
    dispatch(getDataSuccess(response.data));
  } catch (error) {
    dispatch(getDataFailure(error.message));
  }
};

export const fetchCurrentAppointments = (date) => async (dispatch) => {
  dispatch(getDataStart());
  try {
    const response = await axios.get(`${appointmentDays}?fecha=${date}`);
    dispatch(getDataSuccess(response.data));
  } catch (error) {
    dispatch(getDataFailure(error.message));
  }
};
