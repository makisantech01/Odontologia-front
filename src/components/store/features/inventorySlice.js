import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productosUrl = import.meta.env.VITE_ENDPOINT;

export const getProducts = createAsyncThunk("inventory/getProductsucts", async () => {
    const response = await axios.get(`${productosUrl}/productos`);
    return response.data.data;
  });

const inventorySlice = createSlice ({
    name: "inventory",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
          state.products = action.payload
        });
      },
})



export const { actions: inventoryActions, reducer: inventoryReducer } = inventorySlice;