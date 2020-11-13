import * as actionTypes from "../actions/actionTypes";

const initialState = {
	collections: [],
	repos: [],
	pending: false,
};

const collectionReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.UPDATE_REPOSITORIES:
			newState.repos = [...action.repos];
			newState.pending = false;
			SyncOccupiedRepositories(newState);
			break;
		case actionTypes.UPDATE_COLLECTIONS:
			newState.collections = [...action.collections];
			newState.pending = false;
			SyncOccupiedRepositories(newState);
			break;
		case actionTypes.DELETE_COLLECTION:
			newState.collections = newState.collections.filter((collection) => {
				return collection.createdAt != action.collection.createdAt;
			});

			break;
		case actionTypes.COLLECTION_PENDING:
			newState.pending = true;
			break;
		case actionTypes.COLLECTION_FAILED:
			newState.pending = false;
			break;
		case actionTypes.COLLECTION_CLEAR:
			return { ...initialState };
		default:
			return state;
	}
	return newState;
};

const SyncOccupiedRepositories = (newState) => {
	const reposInCollection = [];
	newState.collections.forEach((collection) => {
		collection.repos.forEach((repo) => {
			reposInCollection.push(repo.id);
		});
	});
	newState.repos = newState.repos.map((repo) => {
		reposInCollection.forEach((occupiedRepoId) => {
			if (occupiedRepoId === repo.id) repo = { ...repo, occupied: true };
		});
		return repo;
	});
};

export default collectionReducer;
