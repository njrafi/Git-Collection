import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";

class CollectionCard extends Component {
	state = {
		isExpanded: false,
	};

	goToEditCollection = () => {
		this.props.history.push(
			`collections/edit/${this.props.collection.createdAt}`
		);
	};

	render() {
		let repos = <div>No Repos</div>;
		let editAndDeleteButton = (
			<div style={{ display: "inline-block" }}>
				<div style={{ marginLeft: "20px", display: "inline-block" }}>
					<Button
						variant="contained"
						color="default"
						size="small"
						onClick={() => {
							this.goToEditCollection();
						}}
					>
						Edit
					</Button>
				</div>
				<div style={{ marginLeft: "20px", display: "inline-block" }}>
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={() => {
							this.props.deleteCollection(
								this.props.collection,
								this.props.userToken
							);
						}}
					>
						Delete
					</Button>
				</div>
			</div>
		);

		if (this.props.collection.repos != null)
			repos = this.props.collection.repos.map((repo, index) => {
				return (
					<Paper
						variant="outlined"
						key={repo.id}
						style={{ margin: "10px", padding: "10px", textAlign: "center" }}
					>
						<b>{index + 1}.</b> {repo.name}
					</Paper>
				);
			});
		let expandedSection = (
			<div style={{ marginTop: "20px" }}>
				<Button
					variant="contained"
					color="default"
					size="small"
					onClick={() => {
						this.setState({ isExpanded: false });
					}}
				>
					Hide
				</Button>
				{editAndDeleteButton}
				<br />
				<br />
				{repos}
			</div>
		);

		if (!this.state.isExpanded)
			expandedSection = (
				<div style={{ marginTop: "20px", marginBottom: "20px" }}>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={() => {
							this.setState({ isExpanded: true });
						}}
					>
						Expand
					</Button>
					{editAndDeleteButton}
				</div>
			);

		return (
			<Paper style={{ padding: "5px", textAlign: "center" }}>
				<div>
					<b>Name: </b> {this.props.collection.name}
				</div>
				<br />
				<div>
					<b>Type: </b> {this.props.collection.type}
				</div>
				<br />
				<div>
					<b>Creation Date: </b>
					{new Date(this.props.collection.createdAt).toLocaleDateString(
						"en-US"
					)}
				</div>
				<br />
				<div>
					<b>Total Repos: </b> {this.props.collection.repos.length}
				</div>
				<br />
				{expandedSection}
			</Paper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userToken: state.authReducer.firebaseUser.uid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteCollection: (collection, userToken) =>
			dispatch(actionCreators.deleteCollection(collection, userToken)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CollectionCard)
);
