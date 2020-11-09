import Button from "../../Components/UI/Button/Button";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class AuthContainer extends Component {
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
		return card;
	}
}

export default AuthContainer;
