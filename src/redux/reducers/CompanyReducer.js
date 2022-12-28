import { ActionType } from "../ActionType";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_DATA_COMPANY:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        text: "sedang melakukan request",
      };
    case ActionType.REQUEST_DATA_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        text: "Get Company Data Successfully",
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_DATA_COMPANY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        text: "Get Opportunity Failed",
        message: action.payload.message,
        data: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
