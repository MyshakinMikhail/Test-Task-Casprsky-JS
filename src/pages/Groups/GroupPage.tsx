import { useEffect, useState } from "react";
import type { GroupType, UserType } from "../../types";
import classes from "./GroupsPage.module.css";
import { AddGroupForm } from "./components";

const API_URL = "http://localhost:3000/users";

export default function GroupPage() {
	const [groups, setGroups] = useState<GroupType[]>([]);
	const [search, setSearch] = useState("");
	const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isWarningOpen, setIsWarningOpen] = useState(false);

	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((users: UserType[]) => {
				const uniqueGroups: GroupType[] = Array.from(
					new Set(users.map((u) => u.group)),
				).map((group, index) => ({
					id: index + 1,
					name: group,
				}));

				setGroups(
					uniqueGroups.filter((g) =>
						g.name.toLowerCase().includes(search.toLowerCase()),
					),
				);
			});
	}, [search]);

	const handleSelect = (id: number, checked: boolean) => {
		if (checked) {
			setSelectedGroups((prev) => [...prev, id]);
		} else {
			setSelectedGroups((prev) => prev.filter((g) => g !== id));
		}
	};

	const handleDelete = () => {
		setGroups((prev) => prev.filter((g) => !selectedGroups.includes(g.id)));
		setSelectedGroups([]);
		setIsWarningOpen(false);
	};

	return (
		<>
			{isWarningOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<p>Удалить группы?</p>
						<button onClick={handleDelete}>Да</button>
						<button onClick={() => setIsWarningOpen(false)}>
							Нет
						</button>
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<AddGroupForm
							setGroups={setGroups}
							setIsModalOpen={setIsModalOpen}
						/>
					</div>
				</div>
			)}

			<div className={classes.page}>
				<div className={classes.actions}>
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Поиск"
					/>
					<button onClick={() => setIsModalOpen(true)}>
						Добавить группу
					</button>
					<button
						onClick={() => setIsWarningOpen(true)}
						disabled={!selectedGroups.length}
					>
						Удалить
					</button>
				</div>

				<div className={classes.list}>
					{groups.map((group) => (
						<div key={group.id} className={classes.item}>
							<input
								type="checkbox"
								onChange={(e) =>
									handleSelect(group.id, e.target.checked)
								}
							/>
							{group.name}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
