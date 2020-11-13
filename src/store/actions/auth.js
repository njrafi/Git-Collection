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
	let bakendAuthUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

	return (dispatch) => {
		dispatch(apiCallPending());

		fetch(url)
			.then((res) => {
				if (res.status !== 200) throw new Error("Login Failed at Github.");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				let userData = {
					token: firebaseUser.uid,
					name: firebaseUser.displayName,
					email: firebaseUser.email,
					photoUrl: firebaseUser.photoURL,
					githubUser: res,
				};
				return fetch(bakendAuthUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				});
			})
			.then((res) => {
				if (res.status !== 200) throw new Error("Login Failed at Backend.");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				//TODO: filter specific data of githubUser
				dispatch(login(res.user.githubUser, firebaseUser));
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
