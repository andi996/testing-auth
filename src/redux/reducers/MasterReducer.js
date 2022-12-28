import { ActionType } from "../ActionType";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const MasterJobFunctions = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_MASTER_JOB_FUNCTION:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_MASTER_JOB_FUNCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_MASTER_JOB_FUNCTION_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
};

export const MasterLocations = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_MASTER_LOCATION:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_MASTER_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_MASTER_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
};

export const MasterCountries = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_MASTER_COUNTRIES:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case ActionType.REQUEST_MASTER_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_MASTER_COUNTRIES_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
};
