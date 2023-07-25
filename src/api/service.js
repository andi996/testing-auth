import axios from "axios";
import axiosRetry from "axios-retry";
// import Cookies from "js-cookie";
import { useSession, getSession, signOut } from "next-auth/react";

const API_URL = "https://gateway2-beta.karir.com/";
const API_URL_2 = "https://gateway2-beta.karir.com/";
const LOGIN_PAGE_URL = "/login?error=session-expired";
const TOKEN_HEADER_KEY = "Authorization";
const TOKEN_SESSION_PATH = "user.data.token";

async function getUserSession() {
  const session = await getSession();
  if (session?.user?.data?.token) {
    return session?.user?.data?.token;
  }
  return null;
}

function setAuthorizationHeader(config, token) {
  if (token) {
    config.headers[TOKEN_HEADER_KEY] = token;
  }
  return config;
}

function handleRequestError(error) {
  return Promise.reject(error);
}

function handleResponseError(error) {
  if (error?.response?.status === 401 || error?.response?.data?.code === 401) {
    signOut({ callbackUrl: LOGIN_PAGE_URL });
    // window.location = LOGIN_PAGE_URL;
  }
  return Promise.reject(error);
}

function createApi(baseURL) {
  const defaultConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const api = axios.create({ baseURL, config: defaultConfig });
  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(async (config) => {
    const token = await getUserSession();
    return setAuthorizationHeader(config, token);
  }, handleRequestError);

  api.interceptors.response.use((response) => response, handleResponseError);

  return api;
}

export const API = createApi(API_URL);
export const API2 = createApi(API_URL_2);
