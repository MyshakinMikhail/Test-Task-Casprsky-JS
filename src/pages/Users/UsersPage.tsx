import { useEffect, useState } from "react";
import { TableHeader, TableItemList } from "../../components";
import type { UserType } from "../../types";
import { sortUsers } from "../../utils";
import classes from "./UsersPage.module.css";
import { AddUserForm } from "./components";

const API_URL = "http://localhost:3000/users";

export default function UsersPage() {
	const [users, setUsers] = useState<UserType[]>([]);
	const [searchContent, setSearchContent] = useState<string>("");
	const [sortParam, setSortParam] = useState<string>("name");
	const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
	const [isAddedUserModalOpen, setIsAddedUserModalOpen] =
		useState<boolean>(false);
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [isAllUsersSelected, setIsAllUsersSelected] =
		useState<boolean>(false);

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
		const newUsers = users.filter(
			(user) => !selectedUsers.includes(user.id),
		);
		setUsers(newUsers);
		setIsWarningOpen(false);
	};

	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				const filteredData = data.filter((user: UserType) =>
					user.fullName.includes(searchContent),
				);

				const sortedData = sortUsers(filteredData, sortParam);
				setUsers(sortedData);
			});
	}, [searchContent, sortParam]);

	return (
		<>
			{isWarningOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<p>Вы уверены, что хотите удалить пользователей?</p>
						<div className={classes.modalButtons}>
							<button onClick={handleDeleteUsers}>Удалить</button>
							<button onClick={() => setIsWarningOpen(false)}>
								Отмена
							</button>
						</div>
					</div>
				</div>
			)}

			{isAddedUserModalOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<AddUserForm
							setUsers={setUsers}
							setIsAddedUserModalOpen={setIsAddedUserModalOpen}
						/>
					</div>
				</div>
			)}

			<div className={classes.page}>
				<div className={classes.table}>
					<div className={classes.actions}>
						<input
							type="text"
							className={classes.input}
							value={searchContent}
							onChange={(
								e: React.ChangeEvent<
									HTMLInputElement,
									HTMLInputElement
								>,
							) => setSearchContent(e.target.value)}
						/>
						<select
							name="filter"
							id="filter-users"
							value={sortParam}
							onChange={(e) => setSortParam(e.target.value)}
						>
							<option value="name">По имени</option>
							<option value="group">По группе</option>
						</select>
						<button onClick={() => setIsAddedUserModalOpen(true)}>
							Добавить пользователя
						</button>
						<button
							onClick={() => setIsWarningOpen(true)}
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
		</>
	);
}
