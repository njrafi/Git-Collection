import React, { Component } from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";

class NavigationItems extends Component {
	render() {
		let navBar = (
			<ul className={styles.NavigationItems}>
				<NavigationItem link="/">Home</NavigationItem>
				<NavigationItem link="/collections">Collections</NavigationItem>
				<NavigationItem link="/repos">My repos</NavigationItem>
				<NavigationItem link="/login">Logout</NavigationItem>
			</ul>
		);

		if (!this.props.isLoggedin)
			navBar = (
				<ul className={styles.NavigationItems}>
					<NavigationItem link="/login">Login</NavigationItem>
				</ul>
			);

		return navBar;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedin: state.authReducer.user != null,
	};
};

export default connect(mapStateToProps, null)(NavigationItems);
