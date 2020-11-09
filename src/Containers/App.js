import { Component } from "react";
import Layout from "../Components/Layout/Layout";
import Home from "./Home/Home";
import { Redirect, Route, Switch } from "react-router";
import Repos from "./Repos/Repos";
import AuthContainer from "./AuthContainer/AuthContainer";
import { connect } from "react-redux";

class App extends Component {
	render() {
		let routes = (
			<Switch>
				<Route path="/login" component={AuthContainer} />
				<Route path="/repos" component={Repos} />
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
