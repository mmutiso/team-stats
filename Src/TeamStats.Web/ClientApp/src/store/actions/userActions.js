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

import {
	axiosInstance,
	userConfirmationInstance,
} from '../../utils/axiosInstance';

export const registerUser = (payload) => async (dispatch) => {
	dispatch({ type: REQUEST_REGISTER_USER });
	try {
		const res = await axiosInstance.post('/registration', payload);

		if (res.status === 200) {
			dispatch({ type: REGISTER_USER_SUCCESSFUL, payload: res.data });
		} else {
			dispatch({ type: REGISTER_USER_REJECTED, payload: res.statusText });
		}
	} catch (e) {
		dispatch({ type: REGISTER_USER_REJECTED, payload: e.message });
	}
};

export const confirmUserRegistration = (payload) => async (dispatch) => {
	dispatch({ type: CONFIRM_USER_REGISTRATION });

	try {
		const res = await axiosInstance.get(
			`/registration/?Email=${payload.email}&Token=${payload.token}`
		);

		if (res.status === 200) {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			dispatch({
				type: CONFIRM_USER_REGISTRATION_SUCCESSFUL,
				payload: res.data,
			});
		} else {
			dispatch({
				type: CONFIRM_USER_REGISTRATION_REJECTED,
				payload: res.statusText,
			});
		}
	} catch (e) {
		dispatch({
			type: CONFIRM_USER_REGISTRATION_REJECTED,
			payload: e.message,
		});
	}
};

export const requestUserLogin = (email) => async (dispatch) => {
	dispatch({ type: REQUEST_LOGIN_USER });

	try {
		const res = await axiosInstance.get(`/token/request?email=${email}`);
		if (res.status === 200) {
			dispatch({ type: LOGIN_USER_SUCCESSFUL, payload: res.data });
		} else {
			dispatch({ type: LOGIN_USER_REJECTED, payload: res.statusText });
		}
	} catch (e) {
		dispatch({ type: LOGIN_USER_REJECTED, payload: e.message });
	}
};
