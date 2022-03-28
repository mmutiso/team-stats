import {
  RECORD_PLAYERS_ATTENDANCE,
  RECORD_PLAYERS_ATTENDANCE_SUCCESSFUL,
  RECORD_PLAYERS_ATTENDANCE_REJECTED,
  GET_PLAYERS_ATTENDANCE,
  GET_PLAYERS_ATTENDANCE_SUCCESSFUL,
  GET_PLAYERS_ATTENDANCE_REJECTED,
} from "../types";
import { axiosInstance } from "../../utils/axiosInstance";

export const registerPlayersAttendance = (payload) => async (dispatch) => {
  dispatch({ type: RECORD_PLAYERS_ATTENDANCE });

  try {
    const res = await axiosInstance.post("/attendance", payload);

    if (res.status === 200) {
      dispatch({
        type: RECORD_PLAYERS_ATTENDANCE_SUCCESSFUL,
        payload: res.data,
      });
    } else {
      dispatch({
        type: RECORD_PLAYERS_ATTENDANCE_REJECTED,
        payload: res.statusText,
      });
    }
  } catch (e) {
    dispatch({ type: RECORD_PLAYERS_ATTENDANCE_REJECTED, payload: e.message });
  }
};

export const getPlayersAttendance = (payload) => async (dispatch) => {
  dispatch({ type: GET_PLAYERS_ATTENDANCE });

  try {
    const res = await axiosInstance.get("/attendance", payload);

    if (res.status === 200) {
      dispatch({
        type: GET_PLAYERS_ATTENDANCE_SUCCESSFUL,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_PLAYERS_ATTENDANCE_REJECTED,
        payload: res.statusText,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_PLAYERS_ATTENDANCE_REJECTED,
      payload: e.message,
    });
  }
};
