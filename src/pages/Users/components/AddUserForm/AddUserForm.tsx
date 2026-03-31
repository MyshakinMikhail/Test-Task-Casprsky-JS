import { useState, type Dispatch, type SetStateAction } from "react";
import type { UserType } from "../../../../types";
import classes from "./AddUserForm.module.css";

type Props = {
	setUsers: Dispatch<SetStateAction<UserType[]>>;
	setIsAddedUserModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddUserForm({
	setUsers,
	setIsAddedUserModalOpen,
}: Props) {
	const [fullName, setFullName] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [group, setGroup] = useState<string>("");
	const [phone, setPhone] = useState<string>("");

	const handleAddUser = () => {
		setUsers((prevUsers) => {
			const lastId = prevUsers[prevUsers.length - 1].id;
			return [
				...prevUsers,
				{
					id: lastId + 1,
					fullName: fullName,
					username: userName,
					email: email,
					group: group,
					phone: phone,
				},
			];
		});

		setIsAddedUserModalOpen(false);
	};

	return (
		<form className={classes.form}>
			<div className={classes.formItem}>
				<label>Полное имя</label>
				<input
					className={classes.formInput}
					value={fullName}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement,
							HTMLInputElement
						>,
					) => setFullName(e.target.value)}
				/>
			</div>
			<div className={classes.formItem}>
				<label>Учетная запись</label>
				<input
					className={classes.formInput}
					value={userName}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement,
							HTMLInputElement
						>,
					) => setUserName(e.target.value)}
				/>
			</div>
			<div className={classes.formItem}>
				<label>Электронная почта</label>
				<input
					className={classes.formInput}
					value={email}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement,
							HTMLInputElement
						>,
					) => setEmail(e.target.value)}
				/>
			</div>
			<div className={classes.formItem}>
				<label>Группа</label>
				<input
					className={classes.formInput}
					value={group}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement,
							HTMLInputElement
						>,
					) => setGroup(e.target.value)}
				/>
			</div>
			<div className={classes.formItem}>
				<label>Номер телефона</label>
				<input
					className={classes.formInput}
					value={phone}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement,
							HTMLInputElement
						>,
					) => setPhone(e.target.value)}
				/>
			</div>

			<div className={classes.modalButtons}>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleAddUser();
					}}
				>
					Добавить
				</button>
				<button onClick={() => setIsAddedUserModalOpen(false)}>
					Отмена
				</button>
			</div>
		</form>
	);
}
