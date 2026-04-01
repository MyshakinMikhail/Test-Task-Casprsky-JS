import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GroupType, UserType } from "../../types";
import classes from "./GroupsPage.module.css";
import { AddGroupForm } from "./components";

const API_URL = "http://localhost:3000/users";

export default function GroupPage() {
	const [allGroups, setAllGroups] = useState<GroupType[]>([]);
	const [search, setSearch] = useState("");
	const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isWarningOpen, setIsWarningOpen] = useState(false);

	const debounceTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

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
				setAllGroups(uniqueGroups);
			});
	}, []);

	const handleSearchChange = useCallback((value: string) => {
		if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		debounceTimeout.current = setTimeout(() => {
			setSearch(value);
		}, 300);
	}, []);

	const filteredGroups = useMemo(() => {
		if (!search.trim()) return allGroups;
		const lowerSearch = search.toLowerCase();
		return allGroups.filter((g) =>
			g.name.toLowerCase().includes(lowerSearch),
		);
	}, [allGroups, search]);

	const groups = filteredGroups;

	const handleSelect = useCallback((id: number, checked: boolean) => {
		if (checked) {
			setSelectedGroups((prev) => [...prev, id]);
		} else {
			setSelectedGroups((prev) => prev.filter((g) => g !== id));
		}
	}, []);

	const handleDelete = useCallback(() => {
		setAllGroups((prev) =>
			prev.filter((g) => !selectedGroups.includes(g.id)),
		);
		setSelectedGroups([]);
		setIsWarningOpen(false);
	}, [selectedGroups]);

	return (
		<>
			{isWarningOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<p>Удалить группы?</p>
						<div className={classes.buttons}>
							<button onClick={handleDelete}>Да</button>
							<button onClick={() => setIsWarningOpen(false)}>
								Нет
							</button>
						</div>
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className={classes.modal}>
					<div className={classes.modalContent}>
						<AddGroupForm
							setGroups={setAllGroups}
							setIsModalOpen={setIsModalOpen}
						/>
					</div>
				</div>
			)}

			<div className={classes.page}>
				<div className={classes.actions}>
					<input
						defaultValue={search}
						onChange={(e) => handleSearchChange(e.target.value)}
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
					{groups.length === 0 && (
						<div>Групп не существует, добавьте первую группу</div>
					)}
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
