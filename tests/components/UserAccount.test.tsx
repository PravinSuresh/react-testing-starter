import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("User Account", () => {
	it("should render user profile heading and edit button when user is admin", () => {
		const user: User = {
			id: 1,
			name: "Pravin",
			isAdmin: true,
		};
		render(<UserAccount user={user} />);
		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/User Profile/i);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/edit/i);

		const name = screen.getByText(user.name);
		expect(name).toBeInTheDocument();
	});
	it("should not render edit button when user is not admin", () => {
		const user: User = {
			id: 2,
			name: "Suresh",
		};
		render(<UserAccount user={user} />);

		const button = screen.queryByRole("button");
		expect(button).not.toBeInTheDocument();

		const name = screen.getByText(user.name);
		expect(name).toBeInTheDocument();
	});
});
