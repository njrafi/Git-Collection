import { connect } from "react-redux";
import Button from "../../Components/UI/Button/Button";
import * as actionCreators from "../../store/actions/index";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class AuthContainer extends Component {
	render() {
		let card = (
			<SimpleCard>
				<div>Please Sign in to continue</div>
				<Button buttonType="Success" onClick={() => this.props.login(69)}>
					Log in
				</Button>
			</SimpleCard>
		);

		if (this.props.user)
			card = (
				<SimpleCard>
					<div>Logged in</div>
					<Button buttonType="Danger" onClick={() => this.props.logout()}>
						Sign out
					</Button>
				</SimpleCard>
			);
		return card;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.authReducer.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (userId) => dispatch(actionCreators.login(userId)),
		logout: () => dispatch(actionCreators.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
