import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Grid from "@material-ui/core/Grid";
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
			return (
				<Grid key={index} item xs={12} sm={6} md={4}>
					<CollectionCard collection={collection} />
				</Grid>
			);
		});
		if (this.props.apiCallPending) return <Spinner />;

		return (
			<div>
				<div style={{ flexGrow: "1", padding: "20px" }}>
					<Grid container spacing={3}>
						{collectionCards}
					</Grid>
				</div>
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
