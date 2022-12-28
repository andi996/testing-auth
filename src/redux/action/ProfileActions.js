// import { ActionType, Api } from "../utils/constan";
import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_PROFILE });
  try {
    // =====================
    const config = {
      method: "GET",
      url: `${endpoints.Profile}`,
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_PROFILE_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_PROFILE_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_PROFILE_FAILED,
      payload: {
        message: "Failed Request Profile Data",
        status: response?.status,
      },
    });
  }
};
