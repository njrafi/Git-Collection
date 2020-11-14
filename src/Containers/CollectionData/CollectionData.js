import React, { Component } from "react";
import { Button as MaterialButton } from "@material-ui/core";
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
		collectionIsValid: false,
		isEditCollection: false,
		editingCollectionCreatedAt: null,
	};

	componentDidMount() {
		let availableRepos = [...this.props.repos];
		let isEditCollection = false;
		availableRepos = availableRepos.filter((repo) => !repo.occupied);
		if (this.props.match.params.createdAt) {
			let collectionEditing = this.props.collections.filter(
				(collection) =>
					collection.createdAt == this.props.match.params.createdAt
			);
			isEditCollection = true;
			console.log("CollectionData: componentDidMount", this.props.match.params);
			if (collectionEditing.length > 0) {
				this.makeEditState(collectionEditing[0]);
				return;
			}
		}
		this.setState({
			availableRepos: availableRepos,
			isEditCollection: isEditCollection,
		});
	}

	makeEditState = (collection) => {
		let availableRepos = [...this.props.repos];
		availableRepos = availableRepos.filter((repo) => !repo.occupied);
		let name = collection.name;
		let type = collection.type;
		let addedRepos = collection.repos;
		let newCollectionForm = { ...this.state.collectionFrom };
		newCollectionForm.name.value = name;
		newCollectionForm.type.value = type;
		this.setState({
			collectionFrom: newCollectionForm,
			availableRepos: availableRepos,
			addedRepos: addedRepos,
			isEditCollection: true,
			editingCollectionCreatedAt: collection.createdAt,
			formIsValid: true,
			collectionIsValid: true,
		});
	};

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
			collectionIsValid: formIsValid && this.state.addedRepos.length > 0,
		});
	};

	submitHandler = () => {
		this.props.addToCollection(
			{
				name: this.state.collectionFrom.name.value,
				type: this.state.collectionFrom.type.value,
				createdAt: this.state.editingCollectionCreatedAt || Date.now(),
				repos: this.state.addedRepos,
			},
			this.props.userToken
		);
		this.props.history.goBack();
	};

	moveRepoToCollection = (repo) => {
		let availableRepos = [...this.state.availableRepos];
		availableRepos = availableRepos.filter((r) => r !== repo);
		let addedRepos = [...this.state?.addedRepos];
		addedRepos.push(repo);
		this.setState({
			availableRepos: availableRepos,
			addedRepos: addedRepos,
			collectionIsValid: this.state.formIsValid && addedRepos.length > 0,
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
			collectionIsValid: this.state.formIsValid && addedRepos.length > 0,
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
				<h4 key={repo.id}>
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
				<h4 key={repo.id}>
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
		let topText = <h2> Enter Collection Info</h2>;
		let buttonText = "Add to collection";
		if (this.state.isEditCollection) {
			topText = <h2> Edit Collection Info</h2>;
			buttonText = "Submit";
			if (!this.state.editingCollectionCreatedAt)
				return <h1 style={{ textAlign: "center" }}>Invalid Collection Id</h1>;
		}
		return (
			<div className={styles.CollectionData}>
				{topText}
				{formElementsArray}
				<MaterialButton
					variant="contained"
					color="primary"
					size="large"
					disabled={!this.state.collectionIsValid}
					onClick={() => {
						this.submitHandler();
					}}
				>
					{buttonText}
				</MaterialButton>
				<SimpleCard>
					<h2>Added Repos </h2>
					{addedRepos}
				</SimpleCard>
				<SimpleCard>
					<h2>Available Repos </h2>
					{availableRepos}
				</SimpleCard>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		repos: state.collectionReducer.repos,
		userToken: state.authReducer.firebaseUser.uid,
		collections: state.collectionReducer.collections,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addToCollection: (collection, userToken) =>
			dispatch(actionCreators.addToCollectionAsync(collection, userToken)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CollectionData);
