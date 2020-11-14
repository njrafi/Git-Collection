import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
const { Component } = require("react");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class Home extends Component {
	render() {
		return (
			<div>
				<SimpleCard>
					<div style={{ textAlign: "center" }}>
						<div>
							<Avatar
								src={this.props.user.avatar_url}
								style={{ height: "300px", width: "300px", margin: "auto" }}
								alt="User Image"
							/>
						</div>
						<br />
						<br />
						<b>User Name:</b> {this.props.user.name} <br />
						<b>Total public repos:</b> {this.props.user.public_repos} <br />
						<b>Followers:</b> {this.props.user.followers} <br />
						<b>Following:</b> {this.props.user.following} <br />
					</div>
				</SimpleCard>
				<SimpleCard>
					Total Collections: {this.props.collections.length}
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
