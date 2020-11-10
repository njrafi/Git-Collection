import React, { Component } from "react";
import Button from "../UI/Button/Button";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

class CollectionCard extends Component {
	state = {
		isExpanded: false,
	};

	render() {
		let repos = <div>No Repos</div>;

		if (this.props.collection.repos != null)
			repos = this.props.collection.repos.map((repo) => {
				return (
					<div>
						<div>
							<b>Name:</b> {repo.name}
						</div>
						<br />
					</div>
				);
			});
		let expandedSection = (
			<div>
				<Button
					buttonType="Danger"
					onClick={() => {
						this.setState({ isExpanded: false });
					}}
				>
					Hide
				</Button>
				{repos}
			</div>
		);

		if (!this.state.isExpanded)
			expandedSection = (
				<div>
					<Button
						buttonType="Success"
						onClick={() => {
							this.setState({ isExpanded: true });
						}}
					>
						Expand
					</Button>
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
