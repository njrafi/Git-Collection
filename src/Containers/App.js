import { Component } from "react";
import Layout from "../Components/Layout/Layout";
import Home from "./Home/Home";
import { Redirect, Route, Switch } from "react-router";
import Repos from "./Repos/Repos";
import AuthContainer from "./AuthContainer/AuthContainer";
import { connect } from "react-redux";
import Collections from "./Collections/Collections";
import CollectionData from "./CollectionData/CollectionData";

class App extends Component {
	render() {
		let routes = (
			<Switch>
				<Route path="/login" component={AuthContainer} />
				<Route path="/repos" component={Repos} />
                <Route path="/collections/create" component={CollectionData} />
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
		isLoggedin: state.authReducer.user != null,
	};
};
export default connect(mapStateToProps, null)(App);
