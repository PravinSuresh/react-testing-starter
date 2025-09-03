import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { db } from "../mocks/db";

describe("Product Detail", () => {
	let productId: number;

	beforeAll(() => {
		[1, 2, 3].forEach(() => {
			const product = db.product.create();
			productId = product.id;
		});
	});
	afterAll(() => {
		db.product.delete({ where: { id: { equals: productId } } });
	});
	it("should renderproduct details", async () => {
		const product = db.product.findFirst({
			where: { id: { equals: productId } },
		});
		render(<ProductDetail productId={productId} />);

		expect(
			await screen.findByText(new RegExp(product!.name))
		).toBeInTheDocument();
		expect(
			await screen.findByText(new RegExp(product!.price.toString()))
		).toBeInTheDocument();
	});
});
