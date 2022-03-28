import {
  REGISTER_PLAYERS_REJECTED,
  REGISTER_PLAYERS_SUCCESSFUL,
  REQUEST_REGISTER_PLAYERS,
  GET_PLAYERS_REJECTED,
  GET_PLAYERS_SUCCESSFUL,
  REQUEST_GET_PLAYERS,
} from "../types";

import { axiosInstance } from "../../utils/axiosInstance";

export const registerPlayers = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_PLAYERS });
  try {
    const res = await axiosInstance.post("/players", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_PLAYERS_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_PLAYERS_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_PLAYERS_REJECTED, payload: e.message });
  }
};

export const getPlayers = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_GET_PLAYERS });

  try {
    if (payload) {
      const res = await axiosInstance.get(`/players?TeamId=${payload}`);

      if (res.status === 200) {
        dispatch({ type: GET_PLAYERS_SUCCESSFUL, payload: res.data });
      } else {
        dispatch({ type: GET_PLAYERS_REJECTED, payload: res.statusText });
      }
    } else {
      const res = await axiosInstance.get("/players");

      if (res.status === 200) {
        dispatch({ type: GET_PLAYERS_SUCCESSFUL, payload: res.data });
      } else {
        dispatch({ type: GET_PLAYERS_REJECTED, payload: res.statusText });
      }
    }
  } catch (e) {
    dispatch({ type: GET_PLAYERS_REJECTED, payload: e.message });
  }
};
