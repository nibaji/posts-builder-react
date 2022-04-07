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
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [page, setPage] = useState(0);
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		!loading && getData();
	}, [page]);

	function getData() {
		setLoading(true);
		axios
			.get(
				`https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
			)
			.then((res) => setData(Array.from(new Set(res.data.hits))))
			.catch((err) => setError(true))
			.finally(() => setLoading(false));
	}

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setData([]);
		setPage(newPage);
	};

	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Typography variant="h4" marginY={3}>
				News
			</Typography>
			<TableContainer
				style={{
					borderRadius: "20px",
					borderWidth: "10px",
					borderColor: "yellow",
				}}
			>
				<Table stickyHeader={true}>
					<TableHead>
						<TableRow>
							<TableCell
								style={{
									backgroundColor: "#8B8A25",
									color: "white",
								}}
							>
								Title
							</TableCell>
							<TableCell
								style={{
									backgroundColor: "#8B8A25",
									color: "white",
								}}
							>
								Author
							</TableCell>
							<TableCell
								style={{
									backgroundColor: "#8B8A25",
									color: "white",
								}}
							>
								Date
							</TableCell>
							<TableCell
								style={{
									backgroundColor: "#8B8A25",
									color: "white",
								}}
							>
								URL
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							<CircularProgress
								style={{
									marginLeft: window.innerWidth / 2.5,
									marginTop: 20,
									marginBottom: 20,
								}}
							/>
						) : error ? (
							<Typography
								style={{
									marginLeft: window.innerWidth / 4,
									marginTop: 40,
									marginBottom: 20,
								}}
							>
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
										<TableCell
											style={{
												backgroundColor: "#FFFECB",
											}}
										>
											{title || "-"}
										</TableCell>
										<TableCell
											style={{
												backgroundColor: "#FFFECB",
											}}
										>
											{author || "-"}
										</TableCell>
										<TableCell
											style={{
												backgroundColor: "#FFFECB",
											}}
										>
											{created_at || "-"}
										</TableCell>
										<TableCell
											style={{
												backgroundColor: "#FFFECB",
											}}
										>
											{<a href={url}>{url}</a> || "-"}
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[20]}
								count={50 * 20}
								rowsPerPage={20}
								page={page}
								onPageChange={handleChangePage}
								showFirstButton
								showLastButton
								style={{
									backgroundColor: "#8B8A25",
									borderRadius: "10px",
									color: "white",
									marginTop: 20,
									right: 20,
									position: "absolute",
								}}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Home;
