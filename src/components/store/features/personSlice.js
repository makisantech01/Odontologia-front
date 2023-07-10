import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  persons: [],
};

export const PersonSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.person.push({
        id: state.person.length,
        name: action.payload.name,
      });
    },
  },
});

export default PersonSlice.reducer;
export const { addPerson } = PersonSlice.actions;
