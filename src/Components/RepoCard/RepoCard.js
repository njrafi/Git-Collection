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

		if (this.props.repo.commits != null)
			commits = this.props.repo.commits.map((commit) => {
				return (
					<div>
						<div>
							<b>Commiter:</b> {commit.name}
						</div>
						<div>
							<b>TimeStamp</b> {commit.timestamp}
						</div>
						<br />
					</div>
				);
			});
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
				{commits}
			</div>
		);

		if (!this.state.isExpanded)
			expandedSection = (
				<div style={{ marginTop: "10px" }}>
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
