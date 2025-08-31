import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("Product Image Gallery", () => {
	it("should return nothing when there are no image urls", () => {
		const { container } = render(<ProductImageGallery imageUrls={[]} />);
		expect(container).toBeEmptyDOMElement();
	});
	it("should return images when image array is not empty", () => {
		const imageUrls = ["url1", "url2"];
		render(<ProductImageGallery imageUrls={imageUrls} />);

		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(imageUrls.length);
		imageUrls.forEach((url, index) => {
			expect(images[index]).toHaveAttribute("src", url);
		});
	});
});
