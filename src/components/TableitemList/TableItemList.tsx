import type { UserType } from "../../types";
import TableItem from "../TableItem/TableItem";
import classes from "./TableItemList.module.css";

type Props = {
	users: UserType[];
	selectedUsers: number[];
	handleSelectUser: (userId: number, isChecked: boolean) => void;
};

export default function TableItemList({
	users,
	selectedUsers,
	handleSelectUser,
}: Props) {
	return (
		<div className={classes.list}>
			{users.length === 0 ? (
				<div style={{ marginTop: "10px" }}>
					Пользователей не существует, добавьте первого пользователя
				</div>
			) : (
				<>
					{users.map((user) => (
						<TableItem
							key={user.id}
							item={user}
							isSelected={selectedUsers.includes(user.id)}
							handleSelectUser={handleSelectUser}
						/>
					))}
				</>
			)}
		</div>
	);
}
