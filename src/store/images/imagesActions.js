import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosFaceInstance, axiosInstance } from '@/pages/api/axios';
// Async thunk action to fetch products data
export const fetchProducts = createAsyncThunk('images/fetchProducts', async () => {
  try {
    const response = await axiosInstance.get('/api/products');
    const products = response.data;
    for (const product of products) {
      product.selected = false;
    }
    return products;
  } catch (error) {
    throw error;
  }
});

