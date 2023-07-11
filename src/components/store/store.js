import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./features/clientSlice";
import { usersReducer } from "./features/usersSlice";
import calendarReducer from "./features/calendarSlice";
import { inventoryReducer } from "./features/inventorySlice";
export const store = configureStore({
  reducer: {
    clients: clientReducer,
    users: usersReducer,
    calendar: calendarReducer,
    inventory: inventoryReducer,
  },
});
