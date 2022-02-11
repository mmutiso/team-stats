import {
  REGISTER_TEAM_REJECTED,
  REGISTER_TEAM_SUCCESSFUL,
  REQUEST_REGISTER_TEAM,
  GET_TEAMS,
  GET_TEAMS_SUCCESSFUL,
  GET_TEAMS_REJECTED,
} from "../types";

import { axiosInstance } from "../../axiosInstance";

export const registerTeams = (payload) => async (dispatch) => {
  dispatch({ type: REQUEST_REGISTER_TEAM });
  try {
    const res = await axiosInstance.post("/team", payload);

    if (res.status === 200) {
      dispatch({ type: REGISTER_TEAM_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: REGISTER_TEAM_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: REGISTER_TEAM_REJECTED, payload: e.message });
  }
};

export const getTeams = (clubId) => async (dispatch) => {
  dispatch({ type: GET_TEAMS });

  try {
    const res = await axiosInstance.get(`/team?clubId=${clubId}`);

    if (res.status === 200) {
      dispatch({ type: GET_TEAMS_SUCCESSFUL, payload: res.data });
    } else {
      dispatch({ type: GET_TEAMS_REJECTED, payload: res.statusText });
    }
  } catch (e) {
    dispatch({ type: GET_TEAMS_REJECTED, payload: e.message });
  }
};
