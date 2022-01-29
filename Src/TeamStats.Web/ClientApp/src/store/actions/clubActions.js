import {
  REGISTER_CLUB_REJECTED,
  REGISTER_CLUB_SUCCESSFUL,
  REQUEST_REGISTER_CLUB,
} from "../types";

import { axiosInstance } from "../../axiosInstance";

export const registerClub = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_CLUB });
  try {
    const res = await axiosInstance.post("/clubs", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_CLUB_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_CLUB_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_CLUB_REJECTED, payload: e.message });
  }
};
