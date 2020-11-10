import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
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
					<b>User Name:</b> {this.props.user.name} <br />
					<b>Total public repos:</b> {this.props.repos.length} <br />
					<b>Followers:</b> {this.props.user.followers} <br />
					<b>Following:</b> {this.props.user.following} <br />
					<img
						src={this.props.user.avatar}
						alt="User Image"
						style={{ maxWidth: "50%", height: "auto" }}
					/>
				</SimpleCard>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.authReducer.user,
		collections: state.collectionReducer.collections,
		repos: state.collectionReducer.repos,
	};
};


export default connect(mapStateToProps, null)(Home);
