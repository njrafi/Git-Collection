import React, { Component } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import { withRouter } from "react-router";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

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
			repos = this.props.collection.repos.map((repo) => {
				return (
					<div key={repo.id}>
						<div>
							<b>Name:</b> {repo.name}
						</div>
						<br />
					</div>
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
			<SimpleCard>
				<div>
					<b>Name: </b> {this.props.collection.name}
				</div>
				<div>
					<b>Type: </b> {this.props.collection.type}
				</div>
				<div>
					<b>Creation Date: </b>
					{new Date(this.props.collection.createdAt).toLocaleDateString(
						"en-US"
					)}
				</div>
				<div>
					<b>Total Repos: </b> {this.props.collection.repos.length}
				</div>
				{expandedSection}
			</SimpleCard>
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
