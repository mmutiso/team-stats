import {
  REGISTER_USER_REJECTED,
  REGISTER_USER_SUCCESSFUL,
  REQUEST_REGISTER_USER,
} from "../types";

const initialState = {
  userData: "",
  isUserLoading: false,
  userLoadingError: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER_USER:
      return {
        ...state,
        userData: "",
        isUserLoading: true,
        userLoadingError: "",
      };
    case REGISTER_USER_SUCCESSFUL:
      return {
        ...state,
        userData: action.payload,
        isUserLoading: false,
        userLoadingError: "",
      };
    case REGISTER_USER_REJECTED:
      return {
        ...state,
        userData: "",
        isUserLoading: false,
        userLoadingError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
