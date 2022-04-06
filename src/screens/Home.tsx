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
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getData();
	}, [page]);

	function getData() {
		axios
			.get(
				`https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
			)
			.then((res) => setData(res.data.hits))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}

	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Typography variant="h3" marginBottom={10}>
				News
			</Typography>
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
						{data.map((item) => {
							const { author, created_at, title, url } = item;
							return (
								<TableRow>
									<TableCell>{title || "-"}</TableCell>
									<TableCell>{author || "-"}</TableCell>
									<TableCell>{created_at || "-"}</TableCell>
									<TableCell>{url || "-"}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Home;
