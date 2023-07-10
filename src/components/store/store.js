import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./features/clientSlice";
import { usersReducer } from "./features/usersSlice";
import calendarReducer from "./features/calendarSlice";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    users: usersReducer,
    calendar: calendarReducer,
  },
});
