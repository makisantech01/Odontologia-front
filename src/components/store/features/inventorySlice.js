import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
const productosUrl = import.meta.env.VITE_ENDPOINT;

export const getProducts = createAsyncThunk("inventory/getProductsucts", async () => {
    const response = await axios.get(`${productosUrl}/productos`);
    return response.data.data;
  });


  export const putProducts = createAsyncThunk("inventory/putProductsucts", async (payload) => {
    const { lote, cantidad, nombre, vencimiento, stockMinimo, id } = payload;
    const object = { lote, cantidad, nombre, vencimiento, stockMinimo };
    const dispatch =useDispatch()
    console.log("🚀 ~ file: inventorySlice.js:25 ~ putProducts ~ object:", object);
  
    const response = await axios.put(`${productosUrl}/productos/${id}`, object);

    const responseData = response.data;
    dispatch(getProducts());
    return responseData;
  });
  

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
 
        Swal.fire('Los cambios se realizaron con éxito!', '', 'success');
     
      });
    },
  });
  



export const { actions: inventoryActions, reducer: inventoryReducer } = inventorySlice;