import type { UserType } from "../../types";
import classes from "./TableItem.module.css";

type Props = {
	item: UserType;
	isSelected: boolean;
	handleSelectUser: (userId: number, isChecked: boolean) => void;
};

export default function TableItem({
	item,
	isSelected,
	handleSelectUser,
}: Props) {
	return (
		<div
			className={
				item.group === "Unmanaged"
					? `${classes.card} ${classes.haveGroup}`
					: classes.card
			}
		>
			<input
				className={classes.checkbox}
				type="checkbox"
				checked={isSelected}
				onChange={(
					e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
				) => {
					handleSelectUser(item.id, e.target.checked);
				}}
			/>
			<div>{item.fullName}</div>
			<div>{item.email}</div>
			<div>{item.group}</div>
			<div>{item.phone}</div>
		</div>
	);
}
