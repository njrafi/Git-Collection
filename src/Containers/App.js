import { Component } from "react";
import Layout from "../Components/Layout/Layout";
import Home from "./Home/Home";
import { Redirect, Route, Switch } from "react-router";
import Repos from "./Repos/Repos";
import AuthContainer from "./AuthContainer/AuthContainer";
import { connect } from "react-redux";
import Collections from "./Collections/Collections";
import CollectionData from "./CollectionData/CollectionData";
import * as actionCreators from "../store/actions/index";
class App extends Component {
	componentDidMount() {
		if (!this.props.dataRefreshed && !this.props.apiCallPending) {
			console.log("Data refresh called");
			console.log(this.props.dataRefreshed, this.props.apiCallPending);
			this.props.refreshData(this.props.userName, this.props.userToken);
		}
	}
	render() {
		let routes = (
			<Switch>
				<Route path="/login" component={AuthContainer} />
				<Route path="/repos" component={Repos} />
				<Route path="/collections/create" component={CollectionData} />
                <Route path="/collections/edit/:createdAt" component={CollectionData} />
				<Route path="/collections" component={Collections} />
				<Route path="/" component={Home} />
				<Route render={() => <h1>Are you lost?</h1>} />
			</Switch>
		);
		if (!this.props.isLoggedin)
			routes = (
				<Switch>
					<Route path="/login" component={AuthContainer} />
					<Redirect to="/login" />
				</Switch>
			);
		return <Layout>{routes}</Layout>;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedin: state.authReducer.githubUser != null,
		userName: state.authReducer.githubUser?.login,
		userToken: state.authReducer.firebaseUser?.uid,
		dataRefreshed: state.refreshReducer.refreshed,
		apiCallPending:
			state.authReducer.pending || state.collectionReducer.pending,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		refreshData: (userName, userToken) =>
			dispatch(actionCreators.refreshDataAsync(userName, userToken)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
