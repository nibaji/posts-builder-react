/** @format */

import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

jest.mock("react-router-dom", () => {
	return {
		// ...(jest.requireActual("react-router-dom") as any),
		useNavigate: () => jest.fn(),
	};
});

describe("Home", () => {
	jest.setTimeout(10000);

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

	test("has tableHead", async () => {
		render(<Home />);
		await new Promise((r) => setTimeout(r, 2000));
		const linkElement = screen.getByTestId("tableHead");
		expect(linkElement).toBeInTheDocument();
	});

	test("has tableElement", async () => {
		render(<Home />);
		await new Promise((r) => setTimeout(r, 2000));
		const linkElement = screen.getByTestId("tableRow-1");
		fireEvent.click(linkElement);
		expect(linkElement).toBeInTheDocument();
	});
});
