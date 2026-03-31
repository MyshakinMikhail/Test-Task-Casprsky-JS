import { useEffect, useState } from "react";
import { TableHeader, TableItemList } from "../../components";
import type { UserType } from "../../types";
import classes from "./UsersPage.module.css";

const API_URL = "http://localhost:3000/users";

export default function UsersPage() {
	const [users, setUsers] = useState<UserType[]>([]);
	const [inputContent, setInputContent] = useState<string>("");
	const [filter, setFilter] = useState<string>("name");
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [isAllUsersSelected, setIsAllUsersSelected] =
		useState<boolean>(false);

	const handleAddUser = () => {
		console.log("add user");
	};

	const handleSelectAllUsers = (isChecked: boolean) => {
		if (!isChecked) {
			setIsAllUsersSelected(false);
			setSelectedUsers([]);
		} else {
			setIsAllUsersSelected(isChecked);
			setSelectedUsers(users.map((user) => user.id));
		}
	};

	const handleSelectUser = (userId: number, isChecked: boolean) => {
		if (!isChecked) {
			setSelectedUsers((prevUsers) =>
				prevUsers.filter((id: number) => id !== userId),
			);
		} else {
			setSelectedUsers((prevUsers) => [...prevUsers, userId]);
		}
	};

	const handleDeleteUsers = () => {
		console.log("delete users");
	};

	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
			});
	}, []);

	return (
		<div className={classes.page}>
			<div className={classes.table}>
				<div className={classes.actions}>
					<input
						type="text"
						className={classes.input}
						value={inputContent}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement,
								HTMLInputElement
							>,
						) => setInputContent(e.target.value)}
					/>
					<select
						name="filter"
						id="filter-users"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						<option value="name">По имени</option>
						<option value="group">По группе</option>
					</select>
					<button onClick={handleAddUser}>
						Добавить пользователя
					</button>
					<button
						onClick={handleDeleteUsers}
						disabled={selectedUsers.length === 0}
					>
						Удалить пользователей
					</button>
				</div>
				<TableHeader
					isAllUsersSelected={isAllUsersSelected}
					handleSelectAllUsers={handleSelectAllUsers}
				/>
				{users && (
					<TableItemList
						users={users}
						selectedUsers={selectedUsers}
						handleSelectUser={handleSelectUser}
					/>
				)}
			</div>
		</div>
	);
}
