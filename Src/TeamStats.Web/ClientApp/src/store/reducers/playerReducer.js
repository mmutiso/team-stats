import {
  REGISTER_PLAYER_REJECTED,
  REGISTER_PLAYER_SUCCESSFUL,
  REQUEST_REGISTER_PLAYER,
} from "../types";

const initialState = {
  playerData: [],
  isPlayerLoading: false,
  playerLoadingError: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_PLAYER:
      return {
        ...state,
        playerData: [],
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case REGISTER_PLAYER_SUCCESSFUL:
      return {
        ...state,
        playerData: action.payload,
        isPlayerLoading: false,
        playerLoadingError: "",
      };
    case REGISTER_PLAYER_REJECTED:
      return {
        ...state,
        playerData: [],
        isPlayerLoading: false,
        playerLoadingError: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
