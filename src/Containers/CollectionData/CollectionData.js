import React, { Component } from "react";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import styles from "./CollectionData.module.css";

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
		addedRepos: null,
		availableRepos: null,
		formIsValid: false,
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
		return (
			<div className={styles.CollectionData}>
				<h4> Enter Collection Info</h4>
				<form
					onSubmit={() => {
						console.log("Submit Button Clicked");
					}}
				>
					{formElementsArray}
					<div>Added Repos: </div>
					<div>Available Repos: </div>
					<Button buttonType="Success" disabled={!this.state.formIsValid}>
						Add
					</Button>
				</form>
			</div>
		);
	}
}

export default CollectionData;
