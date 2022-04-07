/** @format */

import { Button, Container } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";

import { styles } from "../styles/screen";
import { detailsLocationState } from "../types/router";

const Details: FC<any> = () => {
	const location = useLocation();

	const { item } = location?.state as detailsLocationState;

	return (
		<Container>
			<Button
				onClick={() => {
					window.history.back();
				}}
				style={styles.backButton}
			>
				{"< Back"}
			</Button>
			<pre>{JSON.stringify(item, null, 4)}</pre>
		</Container>
	);
};

export default Details;
