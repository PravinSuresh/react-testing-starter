import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { db } from "../mocks/db";

describe("Product List", () => {
	const productIds: number[] = [];
	beforeAll(() => {
		[1, 2, 3].forEach(() => {
			const product = db.product.create();
			productIds.push(product.id);
		});
	});
	afterAll(() => {
		db.product.deleteMany({ where: { id: { in: productIds } } });
	});
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
