import React, { Component } from "react";
import CommitCard from "../CommitCard/CommitCard";
import { Button } from "@material-ui/core";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

class RepoCard extends Component {
	state = {
		isExpanded: false,
	};

	render() {
		let commits = <div>No Commit History</div>;

		commits = <CommitCard repo={this.props.repo} />;

		let goToGithubButton = (
			<div style={{ marginLeft: "10px", display: "inline-block" }}>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={() => {
						window.open(this.props.repo.html_url);
					}}
				>
					Go To Github Repo
				</Button>
			</div>
		);

		let expandedSection = (
			<div style={{ marginTop: "10px" }}>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={() => {
						this.setState({ isExpanded: false });
					}}
				>
					Hide Commits
				</Button>
				{goToGithubButton}
				{commits}
			</div>
		);

		if (!this.state.isExpanded)
			expandedSection = (
				<div style={{ marginTop: "10px", display: "inline-block" }}>
					<Button
						variant="contained"
						color="primary"
						size="small"
						onClick={() => {
							this.setState({ isExpanded: true });
						}}
					>
						Show Commits
					</Button>
					{goToGithubButton}
				</div>
			);

		return (
			<div style={{ textAlign: "center" }}>
				<SimpleCard>
					<div>
						<b>name:</b> {this.props.repo.name}
					</div>
					<div>
						<b>Language:</b> {this.props.repo.language}
					</div>
					<div>
						<b>Occupied:</b> {this.props.repo.occupied ? "Yes" : "No"}
					</div>
					{expandedSection}
				</SimpleCard>
			</div>
		);
	}
}

export default RepoCard;
