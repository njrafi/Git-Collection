import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./store/reducers/auth";
import refreshReducer from "./store/reducers/refresh";
import collectionReducer from "./store/reducers/collection";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./Components/UI/Spinner/Spinner";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducers = combineReducers({
	authReducer: authReducer,
	collectionReducer: collectionReducer,
	refreshReducer: refreshReducer,
});

const persistConfig = {
	key: "git-collection-root",
	storage,
	whitelist: ["authReducer", "collectionReducer"],
};

const peristedReducer = persistReducer(persistConfig, rootReducers);

const logger = (store) => {
	return (next) => {
		return (action) => {
			console.log("[Middleware] Dispatching", action);
			const result = next(action);
			console.log("[Middleware] next state", store.getState());
			return result;
		};
	};
};

let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
if (reduxDevTools) reduxDevTools = reduxDevTools({ trace: true });

const composeEnhancers = reduxDevTools || compose;
const store = createStore(
	peristedReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
);
const persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate loading={<Spinner />} persistor={persistor}>
					<App />
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
