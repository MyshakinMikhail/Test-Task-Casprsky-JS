import type { UserType } from "../types";

export const sortUsers = (usersToSort: UserType[], sortType: string) => {
	const sorted = [...usersToSort];

	switch (sortType) {
		case "name":
			return sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
		case "group":
			return sorted.sort((a, b) => a.group.localeCompare(b.group));
		default:
			return sorted;
	}
};
