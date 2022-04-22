/** @format */

import { render, screen } from "@testing-library/react";
import Details from "./Details";

jest.mock("react-router-dom", () => {
	return {
		useLocation: () => {
			return {
				state: {
					item: {
						title: "test",
						description: "test",
						url: "test",
						urlToImage: "test",
						publishedAt: "test",
						content: "test",
					},
				},
			};
		},
	};
});

describe("Details", () => {
	test("renders without crashing", () => {
		render(<Details />);
	});

	test("matches snapshot", () => {
		const view = render(<Details />);
		expect(view).toMatchSnapshot();
	});

	test("contains back button", () => {
		render(<Details />);
		const linkElement = screen.getByText(/back/i);
		linkElement.click();
		expect(linkElement).toBeInTheDocument();
	});
});
