import { connect } from "react-redux";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class Home extends Component {
	render() {
		return (
			<div>
				<SimpleCard>Home</SimpleCard>
				<SimpleCard>
					Total Collections: {this.props.collections.length}
				</SimpleCard>
				<SimpleCard>
					<div style={{ textAlign: "center" }}>
						<b>User Name:</b> {this.props.user.name} <br />
						<b>Total public repos:</b> {this.props.user.public_repos} <br />
						<b>Followers:</b> {this.props.user.followers} <br />
						<b>Following:</b> {this.props.user.following} <br />
						<br />
						<br />
						<img
							src={this.props.user.avatar_url}
							alt="User Image"
							style={{ maxWidth: "30%", height: "auto" }}
						/>
					</div>
				</SimpleCard>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.authReducer.githubUser,
		collections: state.collectionReducer.collections,
		repos: state.collectionReducer.repos,
	};
};

export default connect(mapStateToProps, null)(Home);
