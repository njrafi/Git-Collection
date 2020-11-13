import * as actionTypes from "./actionTypes";
import * as actionCreators from "../actions/index";
export const refreshedData = () => {
	return {
		type: actionTypes.REFRESH_DATA,
	};
};

export const refreshDataAsync = (userName, userToken) => {
	return (dispatch) => {
		dispatch(refreshedData());
		dispatch(actionCreators.getRepositoriesAsync(userName));
		dispatch(actionCreators.getCollectionsAsync(userToken));
	};
};
