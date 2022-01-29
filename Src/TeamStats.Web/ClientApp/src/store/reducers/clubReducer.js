import {
  REGISTER_CLUB_REJECTED,
  REGISTER_CLUB_SUCCESSFUL,
  REQUEST_REGISTER_CLUB,
} from "../types";

const initialState = {
  clubData: [],
  isClubLoading: false,
  clubLoadingError: "",
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_CLUB:
      return {
        ...state,
        clubData: [],
        isClubLoading: false,
        clubLoadingError: "",
      };
    case REGISTER_CLUB_SUCCESSFUL:
      return {
        ...state,
        clubData: action.payload,
        isClubLoading: false,
        clubLoadingError: "",
      };
    case REGISTER_CLUB_REJECTED:
      return {
        ...state,
        clubData: [],
        isClubLoading: false,
        clubLoadingError: action.payload,
      };
    default:
      return state;
  }
};

export default clubReducer;
