import axios from "axios";
import axiosRetry from "axios-retry";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_2 = process.env.REACT_APP_API_URL_2;

const createApi = (baseURL) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const api = axios.create({ baseURL, config });
  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(
    (config) => {
      return new Promise((resolve) => {
        if (Cookies.get("user")) {
          const user = JSON.parse(Cookies.get("user"));
          config.headers.Authorization = user.id;
        }
        resolve(config);
      });
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  api.interceptors.request.use(
    (res) => res,
    (err) => Promise.reject(err)
  );

  return api;
};

export const API = createApi(API_URL);
export const API2 = createApi(API_URL_2);
