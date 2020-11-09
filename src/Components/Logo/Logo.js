import React from "react";
import gitLogo from "../../Assets/Images/logo.png";
import styles from "./Logo.module.css";
const Logo = (props) => {
	return (
		<div className={styles.Logo}>
			<img src={gitLogo} alt="gitLogo"></img>
		</div>  
	);
};

export default Logo;