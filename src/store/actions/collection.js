import * as actionTypes from "./actionTypes";

export const updateRepositories = (repos) => {
	return {
		type: actionTypes.UPDATE_REPOSITORIES,
		repos: repos,
	};
};

export const updateCollections = (collections) => {
	return {
		type: actionTypes.UPDATE_COLLECTIONS,
		collections: collections,
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

export const clearCollections = () => {
	return {
		type: actionTypes.COLLECTION_CLEAR,
	};
};

export const deleteCollection = (collection, userToken) => {
	let url = `${process.env.REACT_APP_BACKEND_URL}/collections`;
	let body = {
		userToken: userToken,
		createdAt: collection.createdAt,
	};
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status !== 200) throw new Error("Delete Collection Failed");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				dispatch(updateCollections(res.collections));
				return res;
			})
			.catch((error) => {
				console.log(error);
				dispatch(apiCallFailed());
			});
	};
};

export const addToCollectionAsync = (collection, userToken) => {
	let url = `${process.env.REACT_APP_BACKEND_URL}/collections`;
	let body = {
		userToken: userToken,
		collection: collection,
	};
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then((res) => {
				if (res.status !== 200) throw new Error("Add to Collection Failed");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				dispatch(updateCollections(res.collections));
				return res;
			})
			.catch((error) => {
				console.log(error);
				dispatch(apiCallFailed());
			});
	};
};

export const getRepositoriesAsync = (userName) => {
	let url = `https://api.github.com/users/${userName}/repos`;
	return (dispatch) => {
		dispatch(apiCallPending());
		fetch(url)
			.then((res) => {
				if (res.status !== 200) throw new Error("Get Repositories Failed");
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
