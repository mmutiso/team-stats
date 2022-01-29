import { combineReducers } from "redux";
import clubReducer from "./clubReducer";
import userReducer from "./userReducer";
import teamReducer from "./teamReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
  clubs: clubReducer,
  users: userReducer,
  teams: teamReducer,
  players: playerReducer,
});
