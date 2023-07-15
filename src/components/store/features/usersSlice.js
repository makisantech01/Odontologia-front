import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (formData) => {
    const response = await axios.post(
      "https://api-sist-odontologico-production.up.railway.app/login",
      formData
    );
    const data = response.data.token;
    return data;
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (formData) => {
    const response = await axios.post(
      "https://api-sist-odontologico-production.up.railway.app/usuarios",
      formData
    );
    const data = response.data;
    return data;
  }
);

const initialState = {
  users: {},
  login: {},
  loading: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        const cookies = new Cookies();
        const responseData = action.payload;
        cookies.set("token", responseData, { path: "/" });
        const typeData = cookies.get("token");
        if (typeData) {
          const decoded = jwt_decode(typeData);
          const adminValue = decoded.admin;
          console.log(adminValue);
          state.type = adminValue;
          state.users = decoded.id;
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.error = "hubo un error al iniciar sesión";
      });
  },
});
export const { actions: usersActions, reducer: usersReducer } = usersSlice;
