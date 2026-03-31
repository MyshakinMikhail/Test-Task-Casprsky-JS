import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar() {
	return (
		<nav className={classes.navbar}>
			<Link type="button" to="welcome">
				Главная
			</Link>
			<Link type="button" to="users">
				Пользователи
			</Link>
			<Link type="button" to="groups">
				Группы
			</Link>
		</nav>
	);
}
