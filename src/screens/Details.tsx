/** @format */

import { Box, Button, Container, Typography } from "@mui/material";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";

const Details: FC<any> = () => {
	const location: any = useLocation();

	const { item } = location.state;

	return (
		<Container>
			<Button
				onClick={() => {
					window.history.back();
				}}
				style={{
					marginTop: "1rem",
					marginBottom: "1rem",
				}}
			>
				{"< Back"}
			</Button>
			<pre>{JSON.stringify(item, null, 4)}</pre>
		</Container>
	);
};

export default Details;
