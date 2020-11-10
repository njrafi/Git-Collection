import React, { Component } from "react";
import { Button as MaterialButton } from "@material-ui/core";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import styles from "./CollectionData.module.css";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
const {
	default: SimpleCard,
} = require("../../Components/UI/SimpleCard/SimpleCard");

class CollectionData extends Component {
	state = {
		collectionFrom: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Collection Name",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			type: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Collection Type",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
		},
		addedRepos: [],
		availableRepos: [],
		formIsValid: false,
	};

	componentDidMount() {
		let availableRepos = [...this.props.repos];
		this.setState({
			availableRepos: availableRepos,
		});
	}

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) return isValid;

		if (rules.required) isValid = value.trim() !== "" && isValid;
		if (rules.minLength)
			isValid = value.trim().length >= rules.minLength && isValid;
		if (rules.maxLength)
			isValid = value.trim().length <= rules.maxLength && isValid;

		return isValid;
	}

	inputChangeHandler = (value, formKey) => {
		console.log(value, formKey);
		const updatedCollectionForm = { ...this.state.collectionFrom };
		updatedCollectionForm[formKey].value = value;
		updatedCollectionForm[formKey].valid = this.checkValidity(
			value,
			updatedCollectionForm[formKey].validation
		);
		updatedCollectionForm[formKey].touched = true;
		let formIsValid = true;
		for (let key in updatedCollectionForm)
			formIsValid = formIsValid && updatedCollectionForm[key].valid;

		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
			console.log(updatedCollectionForm[formKey]);
		this.setState({
			orderForm: updatedCollectionForm,
			formIsValid: formIsValid,
		});
	};

	moveRepoToCollection = (repo) => {
		let availableRepos = [...this.state.availableRepos];
		availableRepos = availableRepos.filter((r) => r !== repo);
		let addedRepos = [...this.state?.addedRepos];
		addedRepos.push(repo);
		this.setState({
			availableRepos: availableRepos,
			addedRepos: addedRepos,
		});
	};

	removeRepoFromCollection = (repo) => {
		let availableRepos = [...this.state?.availableRepos];
		availableRepos.push(repo);
		let addedRepos = [...this.state?.addedRepos];
		addedRepos = addedRepos.filter((r) => r !== repo);
		this.setState({
			availableRepos: availableRepos,
			addedRepos: addedRepos,
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.collectionFrom)
			formElementsArray.push(
				<Input
					{...this.state.collectionFrom[key]}
					key={key}
					changed={(event) => this.inputChangeHandler(event.target.value, key)}
				/>
			);
		const availableRepos = this.state.availableRepos.map((repo, index) => {
			return (
				<h4>
					{index + 1}. {repo.name}{" "}
					<MaterialButton
						variant="contained"
						color="primary"
						size="small"
						onClick={() => {
							this.moveRepoToCollection(repo);
						}}
					>
						add
					</MaterialButton>
				</h4>
			);
		});

		const addedRepos = this.state.addedRepos.map((repo, index) => {
			return (
				<h4>
					{index + 1}. {repo.name}{" "}
					<MaterialButton
						variant="contained"
						color="secondary"
						size="small"
						onClick={() => {
							this.removeRepoFromCollection(repo);
						}}
					>
						Remove
					</MaterialButton>
				</h4>
			);
		});
		return (
			<div className={styles.CollectionData}>
				<h2> Enter Collection Info</h2>
				<form
					onSubmit={() => {
						console.log("Submit Button Clicked");
					}}
				>
					{formElementsArray}
					<SimpleCard>
						<h2>Added Repos </h2>
						{addedRepos}
					</SimpleCard>
					<SimpleCard>
						<h2>Available Repos </h2>
						{availableRepos}
					</SimpleCard>
					<Button buttonType="Success" disabled={!this.state.formIsValid}>
						Add
					</Button>
				</form>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		repos: state.collectionReducer.repos,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateRepositories: (userName) =>
			dispatch(actionCreators.getRepositoriesAsync(userName)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionData);
