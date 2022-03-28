import { combineReducers } from "redux";
import clubReducer from "./clubReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";
import playerReducer from "./playerReducer";
import globalStateReducer from "./globalStateReducer";
import attendanceReducer from "./attendanceReducer";

export default combineReducers({
  clubs: clubReducer,
  users: userReducer,
  teams: teamReducer,
  players: playerReducer,
  globalState: globalStateReducer,
  attendance: attendanceReducer,
});
