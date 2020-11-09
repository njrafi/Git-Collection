import logo from "./logo.svg";
import Button from "../Components/UI/Button/Button";
import SimpleCard from "../Components/UI/SimpleCard/SimpleCard";
import { Component } from "react";
import Toolbar from "../Components/Navigation/Toolbar/Toolbar";
import Layout from "../Components/Layout/Layout";

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

		return (<Layout>{card}</Layout>);
	}
}

export default App;
