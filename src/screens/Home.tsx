/** @format */

import {
	CircularProgress,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles/screen";
import { newsResponse } from "../types/response";

const Home = () => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<newsResponse[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// getData();
		const inter = setInterval(() => {
			!loading &&
				setPage((prev) => {
					return ++prev;
				});
		}, 10000);
		return () => clearInterval(inter);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		!loading && getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	function getData() {
		setLoading(true);
		axios
			.get(
				`https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
			)
			.then((res) => setData(Array.from(new Set([...data, ...res.data.hits]))))
			.catch((err) => setError(true))
			.finally(() => setLoading(false));
	}

	return (
		<Container style={styles.container}>
			<Typography variant="h4" marginY={3}>
				News
			</Typography>
			<TableContainer style={styles.tableContainer}>
				<Table stickyHeader={true}>
					<TableHead>
						<TableRow>
							<TableCell style={styles.tableHeaderCell}>Title</TableCell>
							<TableCell style={styles.tableHeaderCell}>Author</TableCell>
							<TableCell style={styles.tableHeaderCell}>Date</TableCell>
							<TableCell style={styles.tableHeaderCell}>URL</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{error ? (
							<Typography style={styles.error}>
								Something went wrong. Please try again!
							</Typography>
						) : (
							data?.map((item) => {
								const { author, created_at, title, url, objectID } = item;
								return (
									<TableRow
										key={objectID}
										onClick={() => {
											navigate(`/json`, {
												state: {
													item,
												},
											});
										}}
									>
										<TableCell style={styles.tableBodyCell}>
											{title || "-"}
										</TableCell>
										<TableCell style={styles.tableBodyCell}>
											{author || "-"}
										</TableCell>
										<TableCell style={styles.tableBodyCell}>
											{created_at || "-"}
										</TableCell>
										<TableCell style={styles.tableBodyCell}>
											{<a href={url}>{url}</a> || "-"}
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
					<TableFooter>
						<TableCell colSpan={4}>
							{loading && <CircularProgress style={styles.circularProgress} />}
						</TableCell>
					</TableFooter>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Home;
