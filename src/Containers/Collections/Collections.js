import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";
const { Component } = require("react");
const {
	default: CollectionCard,
} = require("../../Components/CollectionCard/CollectionCard");
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class Collections extends Component {
	render() {
		let collectionCards = this.props.collections.map((collection, index) => {
			return <CollectionCard key={index} collection={collection} />;
		});
		if (this.props.apiCallPending) return <Spinner />;

		return (
			<div>
				{collectionCards}
				<div style={{ textAlign: "center", marginBottom: "30px" }}>
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => {
							this.props.history.push("collections/create");
						}}
					>
						Add New Collection
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		collections: state.collectionReducer.collections,
		apiCallPending: state.collectionReducer.pending,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateRepositories: (userName) =>
			dispatch(actionCreators.getRepositoriesAsync(userName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
