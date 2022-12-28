import { ActionType } from "../ActionType";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const StatusLamaran = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_STATUS_LAMARAN:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        text: "sedang melakukan request",
      };
    case ActionType.REQUEST_STATUS_LAMARAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        text: "Get Status Lamaran Successfully",
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_STATUS_LAMARAN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        text: "Get Status Lamaran Failed",
        message: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
};
