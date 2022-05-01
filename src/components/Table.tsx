import { CircularProgress, Link, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { FC, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { style } from "../styles/components";
import {postType} from "../types/response"

const TheTable : FC = ()=>{

    const [posts, setPosts] = useState<postType[]>([])
    const [page, setPage] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const navigate = useNavigate()

   const fetchdata = useCallback(({ pageNumber = 0 }) => {
     setLoading(true);
     axios
       .get(
         `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
       )
       .then((res) =>
         setPosts((prev) => Array.from(new Set([...prev, ...res.data.hits])))
       )
       .catch(() => setError(true))
       .finally(() => setLoading(false));
   }, []);

   const handleScroll = useCallback(() => {
     if (
       window.scrollY + window.innerHeight >=
         document.documentElement.scrollHeight &&
       !loading
     ) {
       setPage((p: number) => ++p);
     }
   }, [loading]);

   useEffect(() => {
     window.addEventListener("scroll", handleScroll);

     return () => window.removeEventListener("scroll", handleScroll);
   }, [handleScroll]);

   useEffect(() => {
     let interval: NodeJS.Timeout | null = null;

     if (!loading && posts.length > 0) {
       interval = setInterval(() => {
         setPage((p: number) => ++p);
       }, 10000);
     }

     return () => {
       if (interval != null) clearInterval(interval);
     };
   }, [loading, posts.length]);

   useEffect(() => {
     if (page === 0) {
       fetchdata({});
       return;
     }

     fetchdata({ pageNumber: page });
   }, [fetchdata, page]);

    return <>
    <TableContainer 
        component={Paper} 
        style={{backgroundColor:"lightgoldenrodyellow"}}
        // onScroll={handleScroll}
    >
        <Table stickyHeader>
            <TableHead
            data-testid={"tableHead"}
            >
                <TableRow>
                    <TableCell
                        style={style.tableHeaderCell}
                    >
                        <Typography
                            style={style.headerText}
                        >
                            Title
                        </Typography>
                    </TableCell>
                    <TableCell
                        style={style.tableHeaderCell}
                    >
                        <Typography
                            style={style.headerText}
                        >
                             URL
                        </Typography>
                    </TableCell>
                    <TableCell
                        style={style.tableHeaderCell}
                    >
                        <Typography
                            style={style.headerText}
                        >
                            Created At
                        </Typography>
                    </TableCell>
                    <TableCell
                        style={style.tableHeaderCell}
                    >
                        <Typography
                            style={style.headerText}
                        >
                            Author
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    posts?.map((post, i)=>{
                        const {title, url, created_at, author} = post
                        return <TableRow
                                    data-testid={`post-${i}`}
                                    onClick={()=>{
                                        navigate("/details", {
                                            state:{
                                                item: post
                                            }
                                        })
                                    }}
                                >
                            <TableCell>
                                <Typography>
                                    {title?.length ? title : "-"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Link>
                                    {url?.length? url : "-"}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {String(created_at).length ? created_at : "-"}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {author?.length ? author : "-"}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
            <TableFooter
                style={style.tableFooter}
            >
                {loading 
                    ? <CircularProgress/> 
                        : error 
                            ? <Typography>
                                Something went wrong. Try Again!
                                </Typography>
                    : <></>
                }
            </TableFooter>
        </Table>
    </TableContainer>
    </>
}

export default TheTable