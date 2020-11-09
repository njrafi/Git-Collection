import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

class Layout extends Component {
	render() {
		return (
			<Aux>
				<Toolbar />

				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
