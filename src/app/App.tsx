import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GroupPage, UsersPage, WelcomePage } from "../pages";
import "./App.css";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/welcome" element={<WelcomePage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/groups" element={<GroupPage />} />

					<Route path="/" element={<WelcomePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
