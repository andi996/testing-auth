import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getDashboardApplications = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_DASHBOARD_APPLICATION });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.dashboardApplications}`,
      data: {
        user_id: id,
        limit: 3,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_DASHBOARD_APPLICATION_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_DASHBOARD_APPLICATION_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_DASHBOARD_APPLICATION_FAILED,
      payload: {
        message: "Failed Request Status Lamaran",
        status: response?.status,
      },
    });
  }
};

export const getDashboardInterviews = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_DASHBOARD_INTERVIEW });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.dashboardInterviews}`,
      data: {
        karir_user_id: id,
        category_ids: [0, 2],
        limit: 1,
        offset: 0,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_DASHBOARD_INTERVIEW_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_DASHBOARD_INTERVIEW_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_DASHBOARD_INTERVIEW_FAILED,
      payload: {
        message: "Failed Request Interview",
        status: response?.status,
      },
    });
  }
};
