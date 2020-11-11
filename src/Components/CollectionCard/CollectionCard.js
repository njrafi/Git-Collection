import React, { Component } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

class CollectionCard extends Component {
	state = {
		isExpanded: false,
	};

	render() {
		let repos = <div>No Repos</div>;
		let editAndDeleteButton = (
			<div style={{ display: "inline-block" }}>
				<div style={{ marginLeft: "20px", display: "inline-block" }}>
					<Button variant="contained" color="default" size="small">
						Edit
					</Button>
				</div>
				<div style={{ marginLeft: "20px", display: "inline-block" }}>
					<Button variant="contained" color="secondary" size="small">
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

export default CollectionCard;
