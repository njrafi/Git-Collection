import * as actionTypes from "./actionsTypes";

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
