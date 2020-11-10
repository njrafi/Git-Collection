import { connect } from "react-redux";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class AuthContainer extends Component {
	state = {
		username: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "username",
			},
			value: "",
			validation: {
				required: false,
			},
			valid: false,
			touched: false,
		},
	};

	userNameChangeHandler = (value) => {
		const updatedUserName = { ...this.state.username };
		updatedUserName.value = value;
		this.setState({
			username: updatedUserName,
		});
	};

	render() {
		let card = (
			<SimpleCard>
				<div>Please Sign in to continue</div>
				<Input
					{...this.state.username}
					changed={(event) => {
						this.userNameChangeHandler(event.target.value);
					}}
				></Input>
				<Button
					buttonType="Success"
					onClick={() => this.props.login(this.state.username.value)}
				>
					Log in
				</Button>
			</SimpleCard>
		);

		if (this.props.user)
			card = (
				<SimpleCard>
					<div>
						<b>{this.props.user.login}</b>, Logged in
					</div>
					<Button buttonType="Danger" onClick={() => this.props.logout()}>
						Sign out
					</Button>
				</SimpleCard>
			);

		if (this.props.apiCallPending)
			card = (
				<SimpleCard>
					<Spinner />
				</SimpleCard>
			);

		return card;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.authReducer.user,
		apiCallPending: state.authReducer.pending,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (userId) => dispatch(actionCreators.loginAsync(userId)),
		logout: () => dispatch(actionCreators.logoutAsync()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
