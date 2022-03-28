import {
  SET_GLOBAL_DATE,
  RESET_GLOBAL_DATE,
  SET_GLOBAL_TEAM,
  RESET_GLOBAL_TEAM,
} from "../types";

const initialState = {
  globalDate: new Date().toISOString(),
  globalTeam: "none",
};

const globalStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_DATE:
      return {
        ...state,
        globalDate: action.payload,
      };
    case RESET_GLOBAL_DATE:
      return {
        ...state,
        globalDate: new Date().toISOString(),
      };

    case SET_GLOBAL_TEAM:
      return {
        ...state,
        globalTeam: action.payload,
      };
    case RESET_GLOBAL_TEAM:
      return {
        ...state,
        globalTeam: "none",
      };

    default:
      return state;
  }
};

export default globalStateReducer;
