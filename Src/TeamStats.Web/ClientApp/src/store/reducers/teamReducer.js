import {
  REGISTER_TEAM_REJECTED,
  REGISTER_TEAM_SUCCESSFUL,
  REQUEST_REGISTER_TEAM,
} from "../types";

const initialState = {
  teamData: [],
  isTeamLoading: false,
  teamLoadingError: "",
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_TEAM:
      return {
        ...state,
        teamData: [],
        isTeamLoading: false,
        teamLoadingError: "",
      };
    case REGISTER_TEAM_SUCCESSFUL:
      return {
        ...state,
        teamData: action.payload,
        isTeamLoading: false,
        teamLoadingError: "",
      };
    case REGISTER_TEAM_REJECTED:
      return {
        ...state,
        teamData: [],
        isTeamLoading: false,
        teamLoadingError: action.payload,
      };
    default:
      return state;
  }
};

export default clubReducer;
