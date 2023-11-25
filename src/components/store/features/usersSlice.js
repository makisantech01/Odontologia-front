import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import Swal from "sweetalert2";
const cookies = new Cookies();

const userUrl = import.meta.env.VITE_ENDPOINT;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_, { getState }) => {
    const state = getState().users;
    const typeData = cookies.get("token");

    if (typeData) {
      const decoded = jwt_decode(typeData);
      return { ...state, type: decoded.admin, users: decoded.id };
    }

    return state;
  }
);

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (formData) => {
    const response = await axios.post(`${userUrl}/login`, formData);
    const data = response.data.token;

    return data;
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (formData) => {
    const response = await axios.post(`${userUrl}/usuarios`, formData);
    const data = response.data;
    console.log("data reg", data);
    return data;
  }
);

const initialState = {
  users: null,
  login: {},
  loading: false,
  regLoading: false,
  error: null,
  type: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.regLoading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.regLoading = false;
        state.users = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.regLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        const responseData = action.payload;
        cookies.set("token", responseData, { path: "/" });
        const typeData = cookies.get("token");
        if (typeData) {
          const decoded = jwt_decode(typeData);
          state.type = decoded.admin;
          state.users = decoded.id;
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "hubo un error al iniciar sesión";
        Swal.fire(
          "Hubo un error al iniciar sesión, inténtelo nuevamente",
          "",
          "error"
        );
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const { type, users } = action.payload;
        state.type = type;
        state.users = users;
      });
  },
});
export const { actions: usersActions, reducer: usersReducer } = usersSlice;
