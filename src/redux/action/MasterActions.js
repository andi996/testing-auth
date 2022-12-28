// import { ActionType, Api } from "../utils/constan";
import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getMasterJobFunctions = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_MASTER_JOB_FUNCTION });
  try {
    // =====================
    const config = {
      method: "GET",
      url: `${endpoints.masterJobFunctions}`,
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_MASTER_JOB_FUNCTION_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_MASTER_JOB_FUNCTION_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_MASTER_JOB_FUNCTION_FAILED,
      payload: {
        message: "Failed Request Popular Search",
        status: response?.status,
      },
    });
  }
};

export const getMasterLocations = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_MASTER_LOCATION });
  try {
    // =====================
    const config = {
      method: "GET",
      url: `${endpoints.masterLocation}`,
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_MASTER_LOCATION_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_MASTER_LOCATION_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_MASTER_LOCATION_FAILED,
      payload: {
        message: "Failed Request Popular Search",
        status: response?.status,
      },
    });
  }
};

export const getMasterCountries = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_MASTER_COUNTRIES });
  try {
    const config = {
      method: "GET",
      url: `${endpoints.MasterCountries}`,
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_MASTER_COUNTRIES_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_MASTER_COUNTRIES_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_MASTER_COUNTRIES_FAILED,
      payload: {
        message: "Failed Request All Countries",
        status: response?.status,
      },
    });
  }
};
