import { ActionType } from "../ActionType";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_BANNER:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_BANNER_FAILED:
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

export const PreferensiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_PREFERENSI:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_PREFERENSI_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_PREFERENSI_FAILED:
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

export const RekomendasiOpportunitiesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES_FAILED:
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

export const PreferensiOpportunitiesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.REQUEST_PREFERENSI_OPPORTUNITIES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_PREFERENSI_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_PREFERENSI_OPPORTUNITIES_FAILED:
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
