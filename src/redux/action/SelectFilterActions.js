import { ActionType } from "../ActionType";

export const AddValue = (payload) => {
  return { type: ActionType.ADD_VALUES, payload };
};

export const RemoveValue = (payload) => {
  return { type: ActionType.REMOVE_VALUES, payload };
};

export const ClearValue = () => {
  return { type: ActionType.CLEAR_VALUES };
};
