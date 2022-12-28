import { ActionType } from "../ActionType";

const initialState = {
  loading: true,
  success: false,
  error: false,
  message: "",
  data: null,
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUEST_PROFILE:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case ActionType.REQUEST_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        message: action.payload.message,
        data: action.payload.data,
      };
    case ActionType.REQUEST_PROFILE_FAILED:
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
