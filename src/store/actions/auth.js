import * as actionTypes from "./actionTypes";
import * as actionCreators from "../actions/index";

export const login = (githubUser, firebaseUser) => {
	return {
		type: actionTypes.LOGIN,
		githubUser: githubUser,
		firebaseUser: firebaseUser,
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const apiCallPending = () => {
	return {
		type: actionTypes.AUTH_PEDNING,
	};
};

export const loginAsync = (githubUserName, firebaseUser) => {
	let url = `https://api.github.com/users/${githubUserName}`;
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url)
			.then((res) => {
				if (res.status != 200) throw new Error("Login Failed");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				//TODO: filter specific data of githubUser
				dispatch(login(res, firebaseUser));
				dispatch(actionCreators.getRepositoriesAsync(githubUserName));
				return res;
			})
			.catch((error) => {
				console.log(error);
				dispatch(logout());
			});
	};
};

export const logoutAsync = () => {
	return (dispatch) => {
		dispatch(apiCallPending());
		setTimeout(() => {
			dispatch(logout());
			dispatch(actionCreators.clearCollections());
		}, 500);
	};
};
