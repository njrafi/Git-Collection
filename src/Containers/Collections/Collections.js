import { Button } from "@material-ui/core";
import { connect } from "react-redux";
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
		return (
			<div>
				<SimpleCard>Collections</SimpleCard>
				{collectionCards}
				<div style={{ textAlign: "center" }}>
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
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateRepositories: (userName) =>
			dispatch(actionCreators.getRepositoriesAsync(userName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
