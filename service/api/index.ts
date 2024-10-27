import axios from "axios";

export const privateAxios = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_PIXABAY_BASE_URL}/?key=${process.env.EXPO_PUBLIC_PIXABAY_KEY}`,
});
