import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosFaceInstance,
  axiosImageInstance,
  axiosInstance,
} from "@/pages/api/axios";
import { loadStripe } from "@stripe/stripe-js";
import { setError, setLoading, setPaymentIntent } from "./imagesSlice";

// Async thunk action to fetch products data
export const fetchProducts = createAsyncThunk(
  "images/fetchProducts",
  async () => {
    try {
      const response = await axiosInstance.get("/api/products");
      const products = response.data;
      for (const product of products) {
        product.selected = false;
      }
      return products;
    } catch (error) {
      throw error;
    }
  }
);

export const stripeCheckout = createAsyncThunk(
  "images/stripeCheckout",
  async (payloadData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      const response = await axiosImageInstance.post(
        "/api/checkout_sessions",
        payloadData
      );
      const session = await response.data;
      //saving payemnt intent in loacl storage for use after stripe redirect
      dispatch(setPaymentIntent(session.payment_intent));
      localStorage.setItem('paymentIntent', session.payment_intent);
      const stripe = await stripePromise;
      const res = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      dispatch(setLoading(false));
      return res;
    } catch (error) {
      dispatch(setLoading(false));
      console.log("error", error);
    }
  }
);

export const verifyFaceFromImage = createAsyncThunk(
  "images/faceCheck",
  async (payloadData, { dispatch }) => {
    try {
      const response = await axiosFaceInstance.post(
        process.env.NEXT_PUBLIC_FACE_DETECTION_URL,
        payloadData
      );
      return response;
    } catch (error) {
      dispatch(setError({message:"Please select an image that has a face."}))
      console.log("error", error);
    }
  }
);
