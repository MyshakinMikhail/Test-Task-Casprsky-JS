import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GroupPage, UsersPage, WelcomePage } from "../pages";
import "./App.css";
import MainNavbar from "./layout/Navbar/MainNabvar";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route element={<MainNavbar />}>
						<Route path="/welcome" element={<WelcomePage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/groups" element={<GroupPage />} />

						<Route path="/" element={<WelcomePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
