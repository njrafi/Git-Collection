import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Spinner from "../UI/Spinner/Spinner";

const columns = [
	{ field: "id", headerName: "Id", width: 60 },
	{ field: "committer", headerName: "Commiter", width: 160 },
	{ field: "date", headerName: "Date", width: 200 },
	{ field: "message", headerName: "Message", width: 500 },

	// { field: "lastName", headerName: "Last name", width: 130 },
	// {
	// 	field: "age",
	// 	headerName: "Age",
	// 	type: "number",
	// 	width: 90,
	// },
	// {
	// 	field: "fullName",
	// 	headerName: "Full name",
	// 	description: "This column has a value getter and is not sortable.",
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params) =>
	// 		`${params.getValue("firstName") || ""} ${
	// 			params.getValue("lastName") || ""
	// 		}`,
	// },
];

class CommitCard extends React.Component {
	state = {
		columns: columns,
		rows: [],
		errorMessage: null,
		apiCallPending: false,
	};

	getAllCommits = () => {
		return new Promise(async (resolve, reject) => {
			let allCommits = [];
			let page = 1;
			let id = 0;
			while (true) {
				try {
					let res = await fetch(
						`https://api.github.com/repos/${this.props.repo.owner.login}/${this.props.repo.name}/commits?per_page=100&page=${page}`
					);
					if (res.status !== 200)
						throw new Error("Error getting commit history");
					let commitInfos = await res.json();
					let commits = commitInfos.map((commitInfo) => {
						id += 1;
						return {
							id: id,
							committer: commitInfo.commit.author.name,
							message: commitInfo.commit.message,
							date: commitInfo.commit.author.date,
						};
					});
					console.log(commits);
					allCommits = [...allCommits, ...commits];
					if (commits.length < 100) break;
				} catch (error) {
					reject(error);
				}
				page += 1;
			}
			console.log(allCommits);
			resolve(allCommits);
		});
	};
	componentDidMount() {
		this.setState({
			apiCallPending: true,
		});

		// TODO: Improve Pagination
		this.getAllCommits()
			.then((allCommits) => {
				this.setState({
					rows: allCommits,
					apiCallPending: false,
				});
				console.log("Got Commits");
			})
			.catch((error) => {
				this.setState({
					errorMessage: error,
					apiCallPending: false,
				});
				console.log(error);
			});
		console.log("Getting Commits");
	}
	render() {
		if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
		if (this.state.apiCallPending) return <Spinner />;
		if (this.state.rows.length == 0) return <h1>No rows</h1>;

		return (
			<div style={{ height: 650, width: "100%" }}>
				<DataGrid
					rows={this.state.rows}
					columns={this.state.columns}
					pageSize={10}
				/>
			</div>
		);
	}
}

export default CommitCard;
