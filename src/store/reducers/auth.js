import * as actionTypes from "../actions/actionTypes";

const dummyUser = {
	id: -1,
	name: "Kuddus",
	email: "KuddusBoyati@gmail.com",
	public_repos: 23,
	followers: 12,
	following: 30,
	avatar_url: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg",
};

const initialState = {
	firebaseUser: null,
	githubUser: null,
	pending: false,
};

const authReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.LOGIN:
            newState.firebaseUser = action.firebaseUser;
            newState.githubUser = action.githubUser;
			newState.pending = false;
			break;
		case actionTypes.LOGOUT:
			return { ...initialState };
		case actionTypes.AUTH_PEDNING:
			newState.pending = true;
			break;
		default:
			return state;
	}
	return newState;
};

export default authReducer;
