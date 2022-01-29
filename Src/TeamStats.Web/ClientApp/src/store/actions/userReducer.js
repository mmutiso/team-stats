import {
  REGISTER_USER_REJECTED,
  REGISTER_USER_SUCCESSFUL,
  REQUEST_REGISTER_USER,
} from "../types";

import { axiosInstance } from "../../axiosInstance";

export const registerClub = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_USER });
  try {
    const res = await axiosInstance.post("/clubs", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_USER_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_USER_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_USER_REJECTED, payload: e.message });
  }
};
