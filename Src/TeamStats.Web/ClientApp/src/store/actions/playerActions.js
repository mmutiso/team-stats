import {
  REGISTER_PLAYER_REJECTED,
  REGISTER_PLAYER_SUCCESSFUL,
  REQUEST_REGISTER_PLAYER,
} from "../types";

import { axiosInstance } from "../../axiosInstance";

export const registerPlayers = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_PLAYER });
  try {
    const res = await axiosInstance.post("/players", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_PLAYER_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_PLAYER_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_PLAYER_REJECTED, payload: e.message });
  }
};
