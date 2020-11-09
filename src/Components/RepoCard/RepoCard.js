import React from "react";
const { default: SimpleCard } = require("../UI/SimpleCard/SimpleCard");

const RepoCard = (props) => {
	return <SimpleCard>Repo Card: {props.repo.name}</SimpleCard>;
};

export default RepoCard;
