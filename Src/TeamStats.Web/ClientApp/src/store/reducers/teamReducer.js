import {
  REGISTER_TEAM_REJECTED,
  REGISTER_TEAM_SUCCESSFUL,
  REQUEST_REGISTER_TEAM,
  GET_TEAMS,
  GET_TEAMS_SUCCESSFUL,
  GET_TEAMS_REJECTED,
} from "../types";

const initialState = {
  teamsRegistrationResponse: [],
  isTeamsRegistrationLoading: false,
  teamsRegistrationError: "",
  isTeamsListLoading: false,
  teamsList: [],
  teamsRequestError: "",
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_TEAM:
      return {
        ...state,
        teamsRegistrationResponse: [],
        isTeamsRegistrationLoading: false,
        teamsRegistrationError: "",
      };
    case REGISTER_TEAM_SUCCESSFUL:
      return {
        ...state,
        teamsRegistrationResponse: action.payload,
        isTeamsRegistrationLoading: false,
        teamsRegistrationError: "",
      };
    case REGISTER_TEAM_REJECTED:
      return {
        ...state,
        teamsRegistrationResponse: [],
        isTeamsRegistrationLoading: false,
        teamsRegistrationError: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        teamsList: [],
        isTeamsListLoading: false,
        teamsRequestError: "",
      };
    case GET_TEAMS_SUCCESSFUL:
      return {
        ...state,
        teamsList: action.payload,
        isTeamsListLoading: false,
        teamsRequestError: "",
      };
    case GET_TEAMS_REJECTED:
      return {
        ...state,
        teamsList: [],
        isTeamsListLoading: false,
        teamsRequestError: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;
