/** @format */

export const styles: Record<string, React.CSSProperties> = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	tableContainer: {
		borderRadius: "20px",
		borderWidth: "10px",
		borderColor: "yellow",
	},
	tableHeaderCell: {
		backgroundColor: "#8B8A25",
		color: "white",
	},
	tableBodyCell: {
		backgroundColor: "#FFFECB",
	},
	tablePagination: {
		backgroundColor: "#8B8A25",
		color: "white",
	},
	error: {
		left: "42%",
		right: "42%",
		margin: 40,
		position: "absolute",
	},
	circularProgress: {
		marginLeft: window.innerWidth / 2.5,
		marginTop: 20,
		marginBottom: 20,
	},
	backButton: {
		marginTop: "1rem",
		marginBottom: "1rem",
	},
};
