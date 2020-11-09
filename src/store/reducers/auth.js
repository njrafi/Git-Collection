import * as actionTypes from "../actions/actionTypes";

const dummyUser = {
	id: -1,
	name: "Kuddus",
	email: "KuddusBoyati@gmail.com",
	repos: 23,
	followers: 12,
	following: 30,
	avatar: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg",
};

const initialState = {
	user: null,
};

const authReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.LOGIN:
			newState.user = {
				...dummyUser,
				id: action.userId,
			};
			break;
		case actionTypes.LOGOUT:
			newState.user = null;
			break;
		default:
	}
	return newState;
};

export default authReducer;
