import * as actionTypes from "../actions/actionTypes";

const initialState = {
	refreshed: false,
};

const refreshReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.REFRESH_DATA:
			newState.refreshed = true;
			break;
		default:
			return state;
	}
	return newState;
};

export default refreshReducer;
