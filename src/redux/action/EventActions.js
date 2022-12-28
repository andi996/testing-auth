// import { ActionType, Api } from "../utils/constan";
import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getEventInfo = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_EVENT });
  try {
    // =====================
    const config = {
      headers: {
        Authorization: "Qar33r_s3cr3t_12345",
      },
      method: "POST",
      url: `${endpoints.GenerateToken}`,
      data: {
        event_id: id,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data?.event;
      dispatch({
        type: ActionType.REQUEST_EVENT_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_EVENT_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_EVENT_FAILED,
      payload: {
        message: "Failed Request Profile Data",
        status: response?.status,
      },
    });
  }
};
