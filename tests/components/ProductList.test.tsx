import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("Product List", () => {
	it("should render Product List component", async () => {
		render(<ProductList />);
		const products = await screen.findAllByRole("listitem");
		expect(products.length).toBeGreaterThan(0);
	});

	it("should render no products message when there are no products", async () => {
		server.use(http.get("/products", () => HttpResponse.json([])));
		render(<ProductList />);
		const message = await screen.findByText(/no products/i);
		expect(message).toBeInTheDocument();
		expect(screen.queryAllByRole("listitem").length).toBe(0);
	});
});
