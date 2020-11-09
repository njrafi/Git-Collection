import * as actionTypes from "../actions/actionTypes";

const initialState = {
	user: null,
};

const authReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.LOGIN:
			newState.user = {
				id: action.userId,
				name: "Kuddus",
				email: "KuddusBoyati",
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
