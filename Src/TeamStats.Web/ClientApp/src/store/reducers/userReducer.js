import {
	REGISTER_USER_REJECTED,
	REGISTER_USER_SUCCESSFUL,
	REQUEST_REGISTER_USER,
	CONFIRM_USER_REGISTRATION,
	CONFIRM_USER_REGISTRATION_SUCCESSFUL,
	CONFIRM_USER_REGISTRATION_REJECTED,
	REQUEST_LOGIN_USER,
	LOGIN_USER_SUCCESSFUL,
	LOGIN_USER_REJECTED,
} from '../types';

const initialState = {
	userData: '',
	isUserLoading: false,
	userLoadingError: '',
	isUserConfirmationLoading: false,
	userConfirmationError: '',
	userConfirmationData: '',
	isUserLoginLoading: false,
	userLoginError: '',
	userLoginData: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_REGISTER_USER:
			return {
				...state,
				userData: '',
				isUserLoading: true,
				userLoadingError: '',
			};
		case REGISTER_USER_SUCCESSFUL:
			return {
				...state,
				userData: action.payload,
				isUserLoading: false,
				userLoadingError: '',
			};
		case REGISTER_USER_REJECTED:
			return {
				...state,
				userData: '',
				isUserLoading: false,
				userLoadingError: action.payload,
			};

		case CONFIRM_USER_REGISTRATION:
			return {
				...state,
				isUserConfirmationLoading: true,
				userConfirmationError: '',
				userConfirmationData: '',
			};
		case CONFIRM_USER_REGISTRATION_SUCCESSFUL:
			return {
				...state,
				isUserConfirmationLoading: false,
				userConfirmationError: '',
				userConfirmationData: action.payload,
			};
		case CONFIRM_USER_REGISTRATION_REJECTED:
			return {
				...state,
				isUserConfirmationLoading: false,
				userConfirmationError: action.payload,
				userConfirmationData: '',
			};

		case REQUEST_LOGIN_USER:
			return {
				...state,
				isUserLoginLoading: true,
				userLoginError: '',
				userLoginData: [],
			};
		case LOGIN_USER_SUCCESSFUL:
			return {
				...state,
				isUserLoginLoading: false,
				userLoginError: '',
				userLoginData: action.payload,
			};
		case LOGIN_USER_REJECTED:
			return {
				...state,
				isUserLoginLoading: false,
				userLoginError: action.payload,
				userLoginData: [],
			};
		default:
			return state;
	}
};

export default userReducer;
