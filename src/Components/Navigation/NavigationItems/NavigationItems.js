import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
	return (
		<ul className={styles.NavigationItems}>
			<NavigationItem link="/">Home</NavigationItem>
			<NavigationItem link="/repos">My repos</NavigationItem>
            <NavigationItem link="/login">Login</NavigationItem>
		</ul>
	);
};

export default NavigationItems;