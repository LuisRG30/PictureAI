import { createSlice } from '@reduxjs/toolkit';
import { ImageSources } from '../utils/mockdata';

const initialState = {
  filters: ImageSources,
  uploadedImage: null,
  filteredImages: ImageSources,
  isLoading: false,
  error: false,
  genre: "Abstract"
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const { id } = action.payload;
      const filter = state.filters.find((filter) => filter.id === id);
      if (filter) {
        filter.isChecked = !filter.isChecked;
      }
    },
    clearFilters: (state) => {
      state.filters.forEach((filter) => {
        filter.isChecked = false;
      });
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
    clearUploadedImage: (state) => {
      state.uploadedImage = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setFilteredImages: (state, action) => {
      state.filteredImages = action.payload;
    },
    removeFilteredImagesById: (state, action) => {
      const idToRemove = action.payload;
      state.filteredImages = state.filteredImages.filter(
        (image) => image.id !== idToRemove
      );
    },
  },
});

export const {
  toggleFilter,
  clearFilters,
  setUploadedImage,
  clearUploadedImage,
  setLoading,
  setError,
  setGenre,
  setFilteredImages,
  removeFilteredImagesById
} = imagesSlice.actions;

export const selectFilters = (state) => state.images.filters;
export const selectUploadedImage = (state) => state.images.uploadedImage;
export const selectIsLoading = (state) => state.images.isLoading;
export const selectError = (state) => state.images.error;
export const selectGenre = (state) => state.images.genre;
export const selectFilteredImages = (state) => state.images.filteredImages;

export default imagesSlice.reducer;
