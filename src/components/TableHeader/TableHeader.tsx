import classes from "./TableHeader.module.css";

type Props = {
	isAllUsersSelected: boolean;
	handleSelectAllUsers: (isChecked: boolean) => void;
};

export default function TableHeader({
	isAllUsersSelected,
	handleSelectAllUsers,
}: Props) {
	return (
		<div className={classes.header}>
			<input
				type="checkbox"
				checked={isAllUsersSelected}
				onChange={(e) => handleSelectAllUsers(e.target.checked)}
			/>
			<div>Полное имя</div>
			<div>Учетная запись</div>
			<div>Электронная почта</div>
			<div>Группа</div>
			<div>Номер телефона</div>
		</div>
	);
}
