import * as actionTypes from "./actionTypes";

export const login = (userId) => {
	return {
		type: actionTypes.LOGIN,
		userId: userId,
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const apiCallPending = () => {
	return {
		type: actionTypes.PENDING,
	};
};

export const loginAsync = (userId) => {
	return (dispatch) => {
		dispatch(apiCallPending());
		setTimeout(() => {
			dispatch(login(userId));
		}, 3000);
	};
};

export const logoutAsync = () => {
	return (dispatch) => {
		dispatch(apiCallPending());
		setTimeout(() => {
			dispatch(logout());
		}, 3000);
	};
};
