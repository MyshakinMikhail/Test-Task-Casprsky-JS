import { Header, Navbar } from "./components";
import classes from "./WelcomePage.module.css";

export default function WelcomePage() {
	return (
		<div className={classes.page}>
			<Header />
			<Navbar />
		</div>
	);
}
