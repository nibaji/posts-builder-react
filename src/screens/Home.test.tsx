/** @format */

import { render, screen } from "@testing-library/react";
import Home from "./Home";

jest.mock("react-router-dom", () => {
	return {
		useNavigate: jest.fn(),
	};
});

describe("Home", () => {
	test("renders without crashing", () => {
		render(<Home />);
	});

	test("matches snapshot", () => {
		const view = render(<Home />);
		expect(view).toMatchSnapshot();
	});

	test("contains heading", () => {
		render(<Home />);
		const linkElement = screen.getByText("News");
		expect(linkElement).toBeInTheDocument();
	});

	test("has children", () => {
		const { container } = render(<Home />);
		const { children } = container;
		expect(children.length).toBeGreaterThan(0);
	});
});
