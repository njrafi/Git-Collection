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
		allCommitsRetrieved: false,
	};

	loadCommitPage = (page) => {
		console.log("Load Commit page", page);
		return new Promise(async (resolve, reject) => {
			let id = (page - 1) * 100;
			try {
				let res = await fetch(
					`https://api.github.com/repos/${this.props.repo.owner.login}/${this.props.repo.name}/commits?per_page=100&page=${page}`
				);
				if (res.status === 403) throw new Error("Rate Limit Exceeded");
				if (res.status !== 200) throw new Error("Error getting commit history");
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
				resolve(commits);
			} catch (error) {
				reject(error);
				return;
			}
		});
	};

	loadMoreCommits = () => {
		console.log("Load more commits");
		if (this.state.allCommitsRetrieved) return;
		const nextPage = this.state.rows.length / 100 + 1;
		this.loadCommitPage(nextPage)
			.then((newCommits) => {
				this.setState({
					rows: [...this.state.rows, ...newCommits],
					allCommitsRetrieved: newCommits.length < 100,
					apiCallPending: false,
				});
			})
			.catch((error) => {
				this.setState({
					errorMessage: error.message,
					apiCallPending: false,
				});
				console.log(error);
			});
	};
	componentDidMount() {
		this.setState({
			apiCallPending: true,
		});
		if (this.state.rows.length === 0) this.loadMoreCommits();
		console.log("Getting Commits");
	}
	render() {
		if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
		if (this.state.apiCallPending) return <Spinner />;
		if (this.state.rows.length === 0) return <h1>No rows</h1>;

		return (
			<div style={{ height: 650, width: "100%" }}>
				<DataGrid
					rows={this.state.rows}
					columns={this.state.columns}
					pageSize={10}
					onPageChange={(params) => {
						console.log(params);

						if (params.page * 10 >= this.state.rows.length - 10) {
							console.log("Loading more commits because of page change");
							this.loadMoreCommits();
						}
					}}
				/>
			</div>
		);
	}
}

export default CommitCard;
