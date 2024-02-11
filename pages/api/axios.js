import axios from "axios";

const axiosFaceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FACE_DETECTION_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    mode: "cors",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const axiosImageInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const axiosInstance = axios.create({
  baseURL: "",
});
export { axiosFaceInstance, axiosImageInstance, axiosInstance };
