import Button from "../Components/UI/Button/Button";
import SimpleCard from "../Components/UI/SimpleCard/SimpleCard";
import { Component } from "react";
import Layout from "../Components/Layout/Layout";
import Home from "./Home/Home";
import { Route, Switch } from "react-router";
import Repos from "./Repos/Repos";
import AuthContainer from "./AuthContainer/AuthContainer";

class App extends Component {
	state = {
		isLoggedin: false,
	};

	render() {

		return (
			<Layout>
				<Switch>
					<Route path="/login" component={AuthContainer}/>
					<Route path="/repos" component={Repos} />
					<Route path="/" component={Home} />
					<Route render={() => <h1>Are you lost?</h1>} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
