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
	componentDidMount() {
		this.setState({
			apiCallPending: true,
		});
		fetch(
			`https://api.github.com/repos/${this.props.repo.owner.login}/${this.props.repo.name}/commits?per_page=100`
		)
			.then((res) => {
				if (res.status !== 200) throw new Error("Error getting commit history");
				return res.json();
			})
			.then((res) => {
				if (res.error) {
					throw res.error;
				}
				let commits = res.map((commitInfo, index) => {
					return {
						id: index + 1,
						committer: commitInfo.commit.author.name,
						message: commitInfo.commit.message,
						date: commitInfo.commit.author.date,
					};
				});
				console.log(commits);

				this.setState({
					rows: commits,
					apiCallPending: false,
				});
				return res;
			})
			.catch((error) => {
				this.setState({
					errorMessage: error,
					apiCallPending: false,
				});
				console.log(error);
			});
	}
	render() {
		if (this.state.errorMessage) return <h1>{this.state.errorMessage}</h1>;
		if (this.state.apiCallPending) return <Spinner />;
		return (
			<div style={{ height: 700, width: "100%" }}>
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
