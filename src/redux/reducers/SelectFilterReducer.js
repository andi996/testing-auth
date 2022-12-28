import { ActionType } from "../ActionType";

const initialState = [];

export const SelectFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_VALUES:
      return [...state, action.payload];
    case ActionType.REMOVE_VALUES:
      return state.filter((i) => i !== action.payload);
    case ActionType.CLEAR_VALUES:
      return [];
    default:
      return state;
  }
};
