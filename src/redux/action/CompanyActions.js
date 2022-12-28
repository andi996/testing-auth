import { ActionType } from "../ActionType";
import { API,API2 } from "../../api/service";
import Cookies from "js-cookie";
import { endpoints } from "../../api/endpoint";

const URL = `https://karir-ms.staging.qareer.com/v1/`;

export const getCompany = (id) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_DATA_COMPANY });
  try {
    const config = {
      method: "POST",
      url: `${URL}company/detail`,
      data: {
        id: id
      },
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_DATA_COMPANY_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_DATA_COMPANY_FAILED,
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
        } Failed Request Detail Opportunity`,
        status: response?.status,
      },
    });
  }
};

