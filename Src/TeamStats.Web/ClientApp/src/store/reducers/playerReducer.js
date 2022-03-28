import {
  REGISTER_PLAYERS_REJECTED,
  REGISTER_PLAYERS_SUCCESSFUL,
  REQUEST_REGISTER_PLAYERS,
  GET_PLAYERS_REJECTED,
  GET_PLAYERS_SUCCESSFUL,
  REQUEST_GET_PLAYERS,
} from "../types";

const initialState = {
  playersData: [],
  isPlayerLoading: false,
  playerLoadingError: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_PLAYERS:
      return {
        ...state,
        playersData: [],
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case REGISTER_PLAYERS_SUCCESSFUL:
      return {
        ...state,
        playersData: action.payload,
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case REGISTER_PLAYERS_REJECTED:
      return {
        ...state,
        playersData: [],
        isPlayerLoading: false,
        playerLoadingError: action.payload,
      };
    case REQUEST_GET_PLAYERS:
      return {
        ...state,
        playersData: [],
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case GET_PLAYERS_SUCCESSFUL:
      return {
        ...state,
        playersData: action.payload,
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case GET_PLAYERS_REJECTED:
      return {
        ...state,
        playersData: [],
        isPlayerLoading: false,
        playerLoadingError: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
