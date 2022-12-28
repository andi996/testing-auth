import { ActionType } from "../ActionType";
import { API, API2 } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getBanners = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_BANNER });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.banner}`,
      data: {
        offset: 0,
        limit: 10,
      },
    };
    // =====================
    const response = await API2(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_BANNER_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_BANNER_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_BANNER_FAILED,
      payload: {
        message: "Failed Request Banner",
        status: response?.status,
      },
    });
  }
};

export const getPreferensi = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_PREFERENSI });
  try {
    // =====================
    const config = {
      method: "GET",
      url: `${endpoints.preferensi}` + id,
    };
    // =====================
    const response = await API2(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_PREFERENSI_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_PREFERENSI_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_PREFERENSI_FAILED,
      payload: {
        message: "Failed Request Preferensi",
        status: response?.status,
      },
    });
  }
};

export const getRekomendasiOpportunities = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.rekomendasiOpportunities}`,
      data: {
        user_id: id,
        limit: 10,
        offset: 0,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_REKOMENDASI_OPPORTUNITIES_FAILED,
      payload: {
        message: "Failed Request Preferensi",
        status: response?.status,
      },
    });
  }
};

export const getPreferensiOpportunities =
  (user_id, expected_salary, job_function_ids, location_ids) =>
  async (dispatch) => {
    dispatch({ type: ActionType.REQUEST_PREFERENSI_OPPORTUNITIES });
    try {
      // =====================
      const config = {
        method: "POST",
        url: `${endpoints.preferensiOpportunities}`,
        data: {
          user_id: user_id,
          expected_salary: expected_salary,
          job_function_ids: job_function_ids,
          location_ids: location_ids,
          offset: 0,
          limit: 10,
        },
      };
      // =====================
      const response = await API(config);
      const message = response?.data?.meta?.message;

      if (response?.status === 200) {
        let data = response?.data?.data;
        dispatch({
          type: ActionType.REQUEST_PREFERENSI_OPPORTUNITIES_SUCCESS,
          payload: { data, message },
        });
      } else {
        dispatch({
          type: ActionType.REQUEST_PREFERENSI_OPPORTUNITIES_FAILED,
          payload: { message },
        });
      }
    } catch (error) {
      const { response } = error;
      dispatch({
        type: ActionType.REQUEST_PREFERENSI_OPPORTUNITIES_FAILED,
        payload: {
          message: "Failed Request Preferensi Opportunities",
          status: response?.status,
        },
      });
    }
  };
