import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './images/imagesSlice';

const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
});

export default store;
