import { ActionType } from "../ActionType";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const Opportunity = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_OPPORTUNITY:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        text: "sedang melakukan request",
      };
    case ActionType.REQUEST_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        text: "Get Opportunity Successfully",
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_OPPORTUNITY_FAILED:
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
