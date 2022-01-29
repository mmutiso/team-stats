import {
  REGISTER_TEAM_REJECTED,
  REGISTER_TEAM_SUCCESSFUL,
  REQUEST_REGISTER_TEAM,
} from "../types";

import { axiosInstance } from "../../axiosInstance";

export const registerClub = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_TEAM });
  try {
    const res = await axiosInstance.post("/teams", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_TEAM_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_TEAM_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_TEAM_REJECTED, payload: e.message });
  }
};
