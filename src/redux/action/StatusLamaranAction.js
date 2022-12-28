import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import Cookies from "js-cookie";

// const userId = 6857680;
const userId = 3078827;
const URL = `https://karir-ms.staging.qareer.com`;

export const getStatusLamaran = (payload) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_STATUS_LAMARAN });
  try {
    const config = {
      method: "POST",
      url: `${URL}/v2/user/applications`,
      data: { user_id: userId },
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_STATUS_LAMARAN_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_STATUS_LAMARAN_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_OPPORTUNITY_FAILED,
      payload: {
        message: `${
          response?.status >= 500 ? response?.status : "Server Error!"
        } Failed Request Status Lamaran`,
        status: response?.status,
      },
    });
  }
};

export const confirmAttendance = (payload) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_STATUS_LAMARAN });
  try {
    const config = {
      method: "POST",
      url: `${URL}/v1/interview/attend`,
      data: { karir_user_id: userId, ...payload },
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      dispatch(getStatusLamaran());
    } else {
      dispatch({
        type: ActionType.REQUEST_STATUS_LAMARAN_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_OPPORTUNITY_FAILED,
      payload: {
        message: `${
          response?.status >= 500 ? response?.status : "Server Error!"
        } Failed Request Status Lamaran`,
        status: response?.status,
      },
    });
  }
};

export const readStatusLamaran = (payload) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_STATUS_LAMARAN });
  try {
    const config = {
      method: "POST",
      url: `${URL}/v1/user/applications/read`,
      data: { user_id: userId, ...payload },
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      dispatch(getStatusLamaran());
    } else {
      dispatch({
        type: ActionType.REQUEST_STATUS_LAMARAN_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_OPPORTUNITY_FAILED,
      payload: {
        message: `${
          response?.status >= 500 ? response?.status : "Server Error!"
        } Failed Request Status Lamaran`,
        status: response?.status,
      },
    });
  }
};
