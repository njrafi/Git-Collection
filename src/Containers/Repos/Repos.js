import { connect } from "react-redux";
import RepoCard from "../../Components/RepoCard/RepoCard";
import Button from "../../Components/UI/Button/Button";
import * as actionCreators from "../../store/actions/index";
const { Component } = require("react");

class Repos extends Component {
	render() {
		let repoCards = this.props.repos.map((repo, index) => {
			return <RepoCard key={index} repo={repo} />;
		});

		let updateButton = (
			<Button
				buttonType="Success"
				onClick={() => this.props.updateRepositories(this.props.userName)}
			>
				Update
			</Button>
		);

		return <div>{repoCards}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		repos: state.collectionReducer.repos,
		userName: state.authReducer.user.login,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateRepositories: (userName) =>
			dispatch(actionCreators.getRepositoriesAsync(userName)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Repos);
