import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "./features/clientSlice";
import { usersReducer } from "./features/usersSlice";
import calendarReducer from "./features/calendarSlice";
import { inventoryReducer } from "./features/inventorySlice";
import { appointmentsReducer } from "./features/appointmentsSlice";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const clientsFromCookies = cookies.get("selectedClient");
const userstokenCookie = cookies.get("token");

let initialClientsState = clientReducer.initialState;
let initialUsersState = usersReducer.initialState;

// Si hay datos de clientes en las Cookies, conviértelos de JSON a un array de objetos
if (clientsFromCookies) {
  try {
    initialClientsState = clientsFromCookies;
  } catch (error) {
    console.error(
      "Error al parsear datos de clientes desde las Cookies:",
      error
    );
  }
}

if (userstokenCookie) {
  try {
    const usersFromCookies = jwt_decode(userstokenCookie);
    initialUsersState = usersFromCookies.id;
  } catch (error) {
    console.error(
      "Error al parsear datos de usuarios desde las Cookies:",
      error
    );
  }
}

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    users: usersReducer,
    calendar: calendarReducer,
    inventory: inventoryReducer,
    appointments: appointmentsReducer,
  },
  preloadedState: {
    clients: {
      selectedClient: initialClientsState,
    },
    users: {
      users: initialUsersState,
    },
  },
});
