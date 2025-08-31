import { render, screen } from "@testing-library/react";
import UserList from "./../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
	it("should render User List with a message when no users present", () => {
		render(<UserList users={[]} />);

		const message = screen.getByText(/no users/i);
		expect(message).toBeInTheDocument();

		const userlist = screen.queryByRole("list");
		expect(userlist).not.toBeInTheDocument();
	});

	it("should render a list of users when users array is not empty", () => {
		const users: User[] = [
			{ id: 1, name: "Pravin", isAdmin: true },
			{ id: 2, name: "Suresh", isAdmin: false },
		];
		render(<UserList users={users} />);

		const message = screen.queryByText(/no users/i);
		expect(message).not.toBeInTheDocument();

		users.forEach((user) => {
			const link = screen.getByRole("link", { name: user.name });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute("href", `/users/${user.id}`);
		});
	});
});
