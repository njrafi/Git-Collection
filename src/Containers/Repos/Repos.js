import { connect } from "react-redux";
import RepoCard from "../../Components/RepoCard/RepoCard";
const { Component } = require("react");

class Repos extends Component {
	render() {
		let repoCards = this.props.repos.map((repo) => {
			return <RepoCard repo={repo} />;
		});

		return repoCards;
	}
}
const mapStateToProps = (state) => {
	return {
		repos: state.collectionReducer.repos,
	};
};

export default connect(mapStateToProps, null)(Repos);
