import Button from "../Components/UI/Button/Button";
import SimpleCard from "../Components/UI/SimpleCard/SimpleCard";
import { Component } from "react";
import Layout from "../Components/Layout/Layout";
import Home from "./Home/Home";
import { Route, Switch } from "react-router";
import Repos from "./Repos/Repos";

class App extends Component {
	state = {
		isLoggedin: false,
	};

	render() {
		let card = (
			<SimpleCard>
				<div>Please Sign in to continue</div>
				<Button
					buttonType="Success"
					onClick={() =>
						this.setState({
							isLoggedin: true,
						})
					}
				>
					Log in
				</Button>
			</SimpleCard>
		);

		if (this.state.isLoggedin)
			card = (
				<SimpleCard>
					<div>Logged in</div>
					<Button
						buttonType="Danger"
						onClick={() =>
							this.setState({
								isLoggedin: false,
							})
						}
					>
						Sign out
					</Button>
				</SimpleCard>
			);

		return (
			<Layout>
				<Switch>
					<Route path="/login" render={() => <div>{card} </div>} />
					<Route path="/repos" component={Repos} />
					<Route path="/" component={Home} />
					<Route render={() => <h1>Are you lost?</h1>} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
