import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import Cookies from "js-cookie";
import { getStatusLamaran } from "./StatusLamaranAction";
import store from "../store";

const userId = 3078827;
// const userId = 7603278;
const URL = `https://karir-ms.staging.qareer.com/v1/`;

export const getOpportunity = (payload) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_OPPORTUNITY });
  try {
    const config = {
      method: "POST",
      url: `${URL}/opportunity/detail`,
      data: payload,
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_OPPORTUNITY_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_OPPORTUNITY_FAILED,
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

export const saveOpportunity = (payload) => async (dispatch, getState) => {
  const state = getState();
  const applications = state.statusLamaran.data;
  const opportunity = state.opportunity.data;
  try {
    const config = {
      method: "POST",
      url: `${URL}/user/save_opportunity`,
      data: payload,
    };
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      // update status lamaran
      if (applications) {
        dispatch({
          type: ActionType.REQUEST_STATUS_LAMARAN_SUCCESS,
          payload: {
            data: [
              ...applications.map((item) => {
                if (item.opportunity?.id === payload?.opportunities[0]) {
                  item.is_saved = !item.is_saved;
                }
                return item;
              }),
            ],
          },
        });
      }

      // update opportunity
      if (opportunity) {
        const saved = !opportunity.saved;
        dispatch({
          type: ActionType.REQUEST_OPPORTUNITY_SUCCESS,
          payload: {
            data: { ...opportunity, saved: saved },
          },
        });
      }
    } else {
      dispatch({
        type: ActionType.REQUEST_OPPORTUNITY_FAILED,
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

export const applyOpportunity = (payload) => async (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        method: "POST",
        url: `${URL}/application`,
        data: payload,
      };
      const response = await API(config);
      if (response?.status === 200) {
        dispatch(
          getOpportunity({
            user_id: payload.user_id,
            id: payload.opportunity_id,
            language: "id",
          })
        );
        dispatch({ type: "SET_LOADING", payload: false });
        resolve();
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
        reject(response?.error);
      }
    } catch (err) {
      dispatch({ type: "SET_LOADING", payload: false });
      reject(err);
    }
  });
};
