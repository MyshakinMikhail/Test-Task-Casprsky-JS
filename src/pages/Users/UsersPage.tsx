import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TableHeader, TableItemList } from "../../components";
import type { UserType } from "../../types";
import { sortUsers } from "../../utils";
import classes from "./UsersPage.module.css";
import { AddUserForm } from "./components";

const API_URL = "http://localhost:3000/users";

export default function UsersPage() {
	const [allUsers, setAllUsers] = useState<UserType[]>([]);
	const [searchContent, setSearchContent] = useState<string>("");
	const [sortParam, setSortParam] = useState<string>("name");
	const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
	const [isAddedUserModalOpen, setIsAddedUserModalOpen] =
		useState<boolean>(false);
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

	const debounceTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data: UserType[]) => setAllUsers(data));
		return () => {
			if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		};
	}, []);

	const handleSearchChange = (value: string) => {
		if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		debounceTimeout.current = setTimeout(() => {
			setSearchContent(value);
		}, 300);
	};

	const filteredUsers = useMemo(() => {
		if (!searchContent.trim()) return allUsers;
		const lowerSearch = searchContent.toLowerCase();
		return allUsers.filter((user) =>
			user.fullName.toLowerCase().includes(lowerSearch),
		);
	}, [allUsers, searchContent]);

	const sortedUsers = useMemo(() => {
		return sortUsers(filteredUsers, sortParam);
	}, [filteredUsers, sortParam]);

	const users = sortedUsers;

	const isAllUsersSelected = useMemo(() => {
		return users.length > 0 && selectedUsers.length === users.length;
	}, [users, selectedUsers]);

	const handleSelectAllUsers = (isChecked: boolean) => {
		if (!isChecked) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(users.map((user) => user.id));
		}
	};

	const handleSelectUser = (userId: number, isChecked: boolean) => {
		if (!isChecked) {
			setSelectedUsers((prev) => prev.filter((id) => id !== userId));
		} else {
			setSelectedUsers((prev) => [...prev, userId]);
		}
	};

	const handleDeleteUsers = useCallback(() => {
		const newUsers = allUsers.filter(
			(user) => !selectedUsers.includes(user.id),
		);
		setAllUsers(newUsers);
		setIsWarningOpen(false);
		setSelectedUsers([]);
	}, [allUsers, selectedUsers]);

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
							setUsers={setAllUsers}
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
							defaultValue={searchContent}
							onChange={(e) => handleSearchChange(e.target.value)}
							placeholder="Поиск..."
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
