import * as actionTypes from "./actionTypes";

export const login = (user) => {
	return {
		type: actionTypes.LOGIN,
		user: user,
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

export const loginAsync = (userName) => {
	userName = "njrafi";
	let url = `https://api.github.com/users/${userName}`;
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				dispatch(login(res));
				return res;
			})
			.catch((error) => {
				console.error(error);
				dispatch(logout);
			});
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
