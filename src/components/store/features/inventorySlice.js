import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
const productosUrl = import.meta.env.VITE_ENDPOINT;

export const getProducts = createAsyncThunk(
  "inventory/getProductsucts",
  async () => {
    const response = await axios.get(`${productosUrl}/productos`);
    return response.data.data;
  }
);

export const putProducts = createAsyncThunk(
  "inventory/putProductsucts",
  async (payload, { dispatch }) => {
    const { lote, cantidad, nombre, vencimiento, stockMinimo, id } = payload;
    const object = { lote, cantidad, nombre, vencimiento, stockMinimo };
    const response = await axios.put(`${productosUrl}/productos/${id}`, object);
    const responseData = response.data;
    dispatch(getProducts());
    return responseData;
  }
);

export const deleteProducts = createAsyncThunk(
  "inventory/deleteProducts",
  async (payload, { dispatch }) => {
    const response = await axios.delete(`${productosUrl}/productos/${payload}`);
    dispatch(getProducts());
    const responseData = response.data;
    return responseData;
  }
);

export const postProducts = createAsyncThunk(
  "inventory/postProducts",
  async (payload, { dispatch }) => {
    const response = await axios.post(`${productosUrl}/productos`, payload);
    dispatch(getProducts());
    const responseData = response.data;
    return responseData;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(putProducts.fulfilled, (state, action) => {
      Swal.fire("Los cambios se realizaron con éxito!", "", "success");
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      Swal.fire("Producto eliminado con éxito!", "", "success");
    });
    builder.addCase(postProducts.fulfilled, (state, action) => {
      Swal.fire("Producto creado con éxito!", "", "success");
    });
  },
});

export const { actions: inventoryActions, reducer: inventoryReducer } =
  inventorySlice;
