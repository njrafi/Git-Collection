import React, { Component } from "react";
import Button from "../UI/Button/Button";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

class RepoCard extends Component {
	state = {
		isExpanded: false,
	};

	render() {
		let commits = <div>No Commit History</div>;

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
			<div>
				<Button
					buttonType="Danger"
					onClick={() => {
						this.setState({ isExpanded: false });
					}}
				>
					Hide
				</Button>
				{commits}
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
						Show
					</Button>
				</div>
			);

		return (
			<SimpleCard>
				<div>name: {this.props.repo.name}</div>
				{expandedSection}
			</SimpleCard>
		);
	}
}

export default RepoCard;
