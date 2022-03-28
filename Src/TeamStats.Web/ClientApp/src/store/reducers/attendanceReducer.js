import {
  RECORD_PLAYERS_ATTENDANCE,
  RECORD_PLAYERS_ATTENDANCE_SUCCESSFUL,
  RECORD_PLAYERS_ATTENDANCE_REJECTED,
} from "../types";

const initialState = {
  attendanceData: [],
  isAttendanceLoading: false,
  attendanceError: "",
};

const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_PLAYERS_ATTENDANCE:
      return {
        ...state,
        attendanceData: [],
        isAttendanceLoading: true,
        attendanceError: "",
      };
    case RECORD_PLAYERS_ATTENDANCE_SUCCESSFUL:
      return {
        ...state,
        attendanceData: action.payload,
        isAttendanceLoading: false,
        attendanceError: "",
      };
    case RECORD_PLAYERS_ATTENDANCE_REJECTED:
      return {
        ...state,
        attendanceData: [],
        isAttendanceLoading: false,
        attendanceError: action.payload,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
