import { useState, type Dispatch, type SetStateAction } from "react";
import classes from "./AddGroupForm.module.css";

type GroupType = {
	id: number;
	name: string;
};

type Props = {
	setGroups: Dispatch<SetStateAction<GroupType[]>>;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddGroupForm({ setGroups, setIsModalOpen }: Props) {
	const [name, setName] = useState("");

	const handleAdd = () => {
		setGroups((prev) => [
			...prev,
			{
				id: prev.length ? prev[prev.length - 1].id + 1 : 1,
				name,
			},
		]);

		setIsModalOpen(false);
	};

	return (
		<form className={classes.form}>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Название группы"
			/>

			<button
				onClick={(e) => {
					e.preventDefault();
					handleAdd();
				}}
			>
				Добавить
			</button>

			<button onClick={() => setIsModalOpen(false)}>Отмена</button>
		</form>
	);
}
