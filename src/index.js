import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./store/reducers/auth";
import collectionReducer from "./store/reducers/collection";
import { Provider } from "react-redux";

const rootReducers = combineReducers({
	authReducer: authReducer,
	collectionReducer: collectionReducer,
});

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

const composeEnhancers = compose;
const store = createStore(
	rootReducers,
	composeEnhancers(applyMiddleware(logger))
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
