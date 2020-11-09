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
