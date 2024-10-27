import axios, { AxiosError } from "axios";
import { privateAxios } from "../api";

const apiUrl = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_PIXABAY_KEY}`;

const formateURL = (params: unknown) => {
  let uri = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";

  if (!params) return uri;

  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    // @ts-ignore
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    uri += `&${key}=${value}`;
  });

  return uri;
};

const getImages = async (params: unknown) => {
  try {
    const response = await axios.get(formateURL(params));

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      //got error from server

      console.log("Server Error in getImages: ", error.response);

      throw new Error("Failed to fetch images");
    }
  }
};

export { getImages };
