import {
	SET_GLOBAL_DATE,
	RESET_GLOBAL_DATE,
	SET_GLOBAL_TEAM,
	RESET_GLOBAL_TEAM,
} from '../types';

export const setGlobalDate = (payload) => (dispatch) => {
	dispatch({ type: SET_GLOBAL_DATE, payload: payload });
};
export const resetGlobalDate = () => (dispatch) => {
	dispatch({ type: RESET_GLOBAL_DATE });
};
export const setGlobalTeam = (payload) => (dispatch) => {
	dispatch({ type: SET_GLOBAL_TEAM, payload: payload });
};
export const resetGlobalTeam = () => (dispatch) => {
	dispatch({ type: RESET_GLOBAL_TEAM });
};
