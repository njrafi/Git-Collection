import * as actionTypes from "./actionTypes";

export const updateRepositories = (repos) => {
	return {
		type: actionTypes.UPDATE_REPOSITORIES,
		repos: repos,
	};
};

export const apiCallPending = () => {
	return {
		type: actionTypes.COLLECTION_PENDING,
	};
};

export const apiCallFailed = () => {
	return {
		type: actionTypes.COLLECTION_FAILED,
	};
};

export const addToCollection = (collection) => {
	return {
		type: actionTypes.ADD_TO_COLLECTION,
		collection: collection,
	};
};

export const markRepositoriesAsOccupied = (repos) => {
	return {
		type: actionTypes.MARK_REPOSITORIES_OCCUPIED,
		repos: repos,
	};
};

export const getRepositoriesAsync = (userName) => {
	let url = `https://api.github.com/users/${userName}/repos`;
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url)
			.then((res) => {
				if (res.status != 200) throw new Error("Get Repositories Failed");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				dispatch(updateRepositories(res));
				return res;
			})
			.catch((error) => {
				console.log(error);
				dispatch(apiCallFailed());
			});
	};
};
