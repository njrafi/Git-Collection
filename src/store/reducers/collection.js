import * as actionTypes from "../actions/actionTypes";

const dummyRepo1 = {
	id: 1,
	name: "dummyRepo1",
	occupied: true,
	commits: [
		{
			name: "dummyUser1",
			timestamp: 1,
		},
		{
			name: "dummyUser1",
			timestamp: 2,
		},
		{
			name: "dummyUser1",
			timestamp: 2,
		},
	],
};

const dummyRepo2 = {
	id: 2,
	name: "dummyRepo2",
	occupied: true,
	commits: [
		{
			name: "dummyUser2",
			timestamp: 4,
		},
		{
			name: "dummyUser2",
			timestamp: 5,
		},
		{
			name: "dummyUser2",
			timestamp: 6,
		},
	],
};

const dummyRepo3 = {
	id: 3,
	name: "dummyRepo3",
	occupied: true,
};

const dummyRepo4 = {
	id: 4,
	name: "dummyRepo4",
	occupied: false,
};

const dummyCollection1 = {
	id: 1,
	name: "DummyCollection1",
	type: "DummyType1",
	createdAt: 1604948698,
	repos: [dummyRepo1, dummyRepo2],
};

const dummyCollection2 = {
	id: 2,
	name: "DummyCollection2",
	type: "DummyType2",
	createdAt: 1604948698,
	repos: [dummyRepo3],
};

const initialState = {
	collections: [dummyCollection1, dummyCollection2],
	repos: [dummyRepo1, dummyRepo2, dummyRepo3, dummyRepo4],
};

const collectionReducer = (state = initialState, action) => {
	return state;
};

export default collectionReducer;
