/** @format */

import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

const Home = () => {
	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Typography variant="h3">News</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Author</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>URL</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Home;
