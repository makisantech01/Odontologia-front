import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendarData: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    getDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDataSuccess(state, action) {
      state.calendarData = action.payload;
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
  calendarSlice.actions;

export default calendarSlice.reducer;

const calendarDays = import.meta.env.VITE_AVAILABLE_DAYS_URL;
export const fetchData = () => async (dispatch) => {
  dispatch(getDataStart());
  try {
    const response = await axios.get(calendarDays);
    dispatch(getDataSuccess(response.data.data));
  } catch (error) {
    dispatch(getDataFailure(error.message));
  }
};
