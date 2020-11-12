import { connect } from "react-redux";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
});
class AuthContainer extends Component {
	state = {
		username: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "github username",
			},
			value: "",
			validation: {
				required: false,
			},
			valid: false,
			touched: false,
		},
		firebaseUser: null,
	};
	uiConfig = {
		signInFlow: "popup",
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		callbacks: {
			signInSuccess: () => false,
		},
	};

	componentDidMount() {
		console.log({
			apiKey: process.env.REACT_APP_API_KEY,
			authDomain: process.env.REACT_APP_AUTHDOMAIN,
		});
		firebase.auth().onAuthStateChanged((firebaseUser) => {
			console.log("Firebase auth changed");
			this.setState({
				firebaseUser: firebaseUser,
			});
		});
	}

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
				<div style={{ textAlign: "center" }}>
					<div>Please Select Your Login Provider</div>
					<StyledFirebaseAuth
						uiConfig={this.uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			</SimpleCard>
		);

		if (this.state.firebaseUser)
			card = (
				<SimpleCard>
					<div>Please Provide your github username</div>
					<Input
						{...this.state.username}
						changed={(event) => {
							this.userNameChangeHandler(event.target.value);
						}}
					></Input>
					<Button
						buttonType="Success"
						onClick={() =>
							this.props.login(
								this.state.username.value,
								this.state.firebaseUser
							)
						}
					>
						Log in
					</Button>
				</SimpleCard>
			);

		if (this.props.githubUser) {
			card = (
				<SimpleCard>
					<div>
						<b>{this.props.githubUser.login}</b>, Logged in
					</div>
					<Button
						buttonType="Danger"
						onClick={() => {
							firebase.auth().signOut();
							this.props.logout();
						}}
					>
						Sign out
					</Button>
				</SimpleCard>
			);
		}

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
		githubUser: state.authReducer.githubUser,
		apiCallPending: state.authReducer.pending,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (githubUserName, firebaseUser) =>
			dispatch(actionCreators.loginAsync(githubUserName, firebaseUser)),
		logout: () => dispatch(actionCreators.logoutAsync()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
