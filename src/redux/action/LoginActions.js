// import { ActionType, Api } from "../utils/constan";
import { ActionType } from "../ActionType";
import { API2 } from "../../api/service";
import { endpoints } from "../../api/endpoint";
import Cookies from "js-cookie";

export const getUserLogin = (payload) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_LOGIN });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.Login}`,
      data: payload,
    };
    // =====================
    const response = await API2(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;

      if (data) {
        // localStorage.setItem("user", JSON.stringify(data));
        Cookies.set("user", JSON.stringify(data));
        Cookies.set("Authorization", data.token);
      }
      dispatch({
        type: ActionType.REQUEST_LOGIN_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_LOGIN_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_LOGIN_FAILED,
      payload: {
        message: `${
          response?.status >= 500 ? response?.status : "Server Error!"
        } Failed Request Login Data`,
        status: response?.status,
      },
    });
  }
};
