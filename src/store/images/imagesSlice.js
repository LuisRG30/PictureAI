import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './imagesActions';

const initialState = {
  filters: [],
  selectedFilters:[],
  uploadedImage: null,
  filteredImages: [],
  isLoading: false,
  error: false,
  genre: 'Abstract',
  gender: null,
  tier: [],
  size: '1280 X 640',
  products: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const { id } = action.payload;
      const filter = state.filters.find((filter) => filter.id === id);
      if (filter) {
        filter.selected = !filter.selected;
      }
    },
    clearFilters: (state) => {
      state.filters.forEach((filter) => {
        filter.selected = false;
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
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setTier: (state, action) => {
      state.tier = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.filters = action.payload;

      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
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
