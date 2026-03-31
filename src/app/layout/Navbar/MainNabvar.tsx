import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../../../pages/Welcome/components";
import classes from "./MainNavbar.module.css";

export default function MainNavbar() {
	return (
		<div className={classes.container}>
			<div className={classes.mainHeader}>
				<Header />
				<Navbar />
			</div>
			<div className={classes.content}>
				<Outlet />
			</div>
		</div>
	);
}
