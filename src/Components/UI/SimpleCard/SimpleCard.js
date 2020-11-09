import React from "react";
import styles from "./SimpleCard.module.css";

const SimpleCard = (props) => {
	return <div className={styles.SimpleCard}>{props.children}</div>;
};

export default SimpleCard;
