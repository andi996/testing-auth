import { ActionType } from "../ActionType";
import Cookies from "js-cookie";

var userData = null;
if (typeof window !== "undefined") {
  // const localUser = localStorage.getItem("user");
  const localUser = Cookies.get("user");
  if (localUser) {
    userData = JSON.parse(localUser);
  }
}

const initialState = userData
  ? {
      loading: false,
      success: false,
      error: false,
      message: "",
      isLoggedIn: true,
      data: userData,
    }
  : {
      loading: false,
      success: false,
      error: false,
      message: "",
      isLoggedIn: false,
      data: null,
    };

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_LOGIN:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
        isLoggedIn: false,
        text: "sedang melakukan request",
      };
    case ActionType.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        isLoggedIn: true,
        data: action.payload.data,
        text: "login berhasil",
      };
    case ActionType.REQUEST_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload.message,
        isLoggedIn: false,
        data: null,
        text: "login gagal",
        status: action.payload.status,
      };
    default:
      return state;
  }
};
