/** @format */

import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Details from "./screens/Details";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/json" element={<Details />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
