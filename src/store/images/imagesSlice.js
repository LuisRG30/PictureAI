import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, stripeCheckout, verifyFaceFromImage } from './imagesActions';

const initialState = {
  filters: [],
  uploadedImage: null,
  paymentIntent: null,
  filteredImages: [],
  isLoading: false,
  error: false,
  genres: null,
  genders: null,
  tiers: null,
  products: [],
  faces: []
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
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setFaces: (state, action) => {
      state.faces = action.payload;
    },
    setPaymentIntent: (state, action) => {
      state.paymentIntent = action.payload;
    },
    setGenders: (state, action) => {
      state.genders = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setTiers: (state, action) => {
      state.tiers = action.payload;
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
    toogleGenre: (state, action) => {
      const genreValue = action.payload.value || action.payload;
      const genre = state.genres.find((g) => g.value === genreValue);
      if (genre) {
        genre.selected = !genre.selected;
      }
    },

    toogleTier: (state, action) => {
      const tierValue = action.payload.value;
      const tier = state.tiers.find((t) => t.value === tierValue);
      if (tier) {
        tier.selected = !tier.selected;
      }
    },

    toogleGender: (state, action) => {
      const genderValue = action.payload.value;
      const gender = state.genders.find((g) => g.value === genderValue);
      if (gender) {
        gender.selected = !gender.selected;
      }
    },
    updateMetadataArrays: (state) => {
      const uniqueGenders = Array.from(new Set(state.products.map(product => product.metadata.gender)
      .filter(gender => gender !== undefined && gender !== null)));
      const uniqueTiers = Array.from(new Set(state.products.map(product => product.metadata.tier)
      .filter(tier => tier !== undefined && tier !== null)));
      const uniqueNames = Array.from(new Set(state.products.map(product => product.name)
      .filter(name => name !== undefined && name !== null)));

      state.genres = uniqueNames.map(value => ({ value, selected: false }));
      state.genders = uniqueGenders.map(value => ({ value, selected: false }));
      state.tiers = [
        ...uniqueTiers.map(value => ({ value, selected: false }))
      ];
      state.filters = state.products.map(product => ({
        source: product.images[0],
        id: product.id,
        genre: product.name,
        gender: product.metadata.gender,
        tier: product.metadata.tier,
        order: product.metadata.order,
        selected: false,
      }));
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
        state.products = action.payload;
        // Dispatch the action to update metadata arrays
        imagesSlice.caseReducers.updateMetadataArrays(state);
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(stripeCheckout.fulfilled, (state, action) => {
        // Handle successful fulfillment
      })
      .addCase(stripeCheckout.rejected, (state, action) => {
        state.error = {message:"Image uplaod error! Please try later"}
      })
      .addCase(verifyFaceFromImage.fulfilled, (state, action) => {
        state.faces = action.payload?.data?.faces || [];
      })
      .addCase(verifyFaceFromImage.rejected, (state, action) => {
        state.error = {message:"Please select an image that has a face."}
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
  setGenres,
  setTiers,
  setGenders,
  setSize,
  setFilteredImages,
  removeFilteredImagesById,
  toogleGender,
  toogleGenre,
  toogleTier,
  setPaymentIntent
} = imagesSlice.actions;

export const selectFilters = (state) => state.images.filters;
export const selectUploadedImage = (state) => state.images.uploadedImage;
export const selectIsLoading = (state) => state.images.isLoading;
export const selectError = (state) => state.images.error;
export const selectGenre = (state) => state.images.genre;
export const selectFilteredImages = (state) => state.images.filteredImages;

export default imagesSlice.reducer;
