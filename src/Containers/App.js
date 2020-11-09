import logo from "./logo.svg";
import Button from "../Components/UI/Button/Button";
import SimpleCard from "../Components/UI/SimpleCard/SimpleCard";

function App() {
	return (
		<div>
			<SimpleCard>
				<div>Please Sign in to continue</div>
				<Button buttonType="Success"> Log in</Button>
			</SimpleCard>
		</div>
	);
}

export default App;
