// import { ActionType, Api } from "../utils/constan";
import { ActionType } from "../ActionType";
import { API } from "../../api/service";
import { endpoints } from "../../api/endpoint";

export const getPopularSearch = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_POPULAR_SEARCH });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.popularSearch}`,
      data: {
        year: 2020,
        limit: 5,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_POPULAR_SEARCH_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_POPULAR_SEARCH_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_POPULAR_SEARCH_FAILED,
      payload: {
        message: "Failed Request Popular Search",
        status: response?.status,
      },
    });
  }
};

export const getBlogs = () => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_BLOG });
  try {
    // =====================
    const config = {
      method: "GET",
      url: `${endpoints.blog}`,
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_BLOG_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_BLOG_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_BLOG_FAILED,
      payload: {
        message: "Failed Request Popular Search",
        status: response?.status,
      },
    });
  }
};

export const getAutoCompleteSearch = (input) => async (dispatch) => {
  dispatch({ type: ActionType.REQUEST_AUTOCOMPLETE_SEARCH });
  try {
    // =====================
    const config = {
      method: "POST",
      url: `${endpoints.autoComplete}`,
      data: {
        keyword: input,
        limit: 5,
      },
    };
    // =====================
    const response = await API(config);
    const message = response?.data?.meta?.message;

    if (response?.status === 200) {
      let data = response?.data?.data;
      dispatch({
        type: ActionType.REQUEST_AUTOCOMPLETE_SEARCH_SUCCESS,
        payload: { data, message },
      });
    } else {
      dispatch({
        type: ActionType.REQUEST_AUTOCOMPLETE_SEARCH_FAILED,
        payload: { message },
      });
    }
  } catch (error) {
    const { response } = error;
    dispatch({
      type: ActionType.REQUEST_AUTOCOMPLETE_SEARCH_FAILED,
      payload: {
        message: "Failed Request Autocomplete Search",
        status: response?.status,
      },
    });
  }
};
