import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handlegetsingleCandidate } from "../API/Candidate";
import toast from "react-hot-toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useLayoutEffect } from "react";

function Candidate() {
  const [candidateData, setCandidateData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const params = useParams();
  const navigate = useNavigate();

  console.log(params.id);

  const getSingleCandidate = async (candidateId) => {
    try {
      const data = await handlegetsingleCandidate(candidateId);
      console.log(`datatatatat`, data?.data);
      console.log(`candidateId`, candidateId);
      if (data?.data?.data?._id == candidateId) {
        console.log(`candidate Data`, data?.data?.data);
        setCandidateData(data?.data?.data);
      } else {
        toast.error("Couldn't find candidate");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Couldn't find candidate");
      navigate("/login");
    }
  };

  useLayoutEffect(() => {
    getSingleCandidate(params.id);
  }, []);

  return (
    <>
      <div className=" w-full h-screen bg-orange-500 flex justify-center items-center">
        <div className="md:w-[60%] sm:w-[70%] w-[90%] h-[80%] bg-white rounded-xl flex justify-evenly items-center flex-col  ">
          <div>{candidateData?.username}</div>
          {candidateData && (
            <div className="w-full h-full flex justify-center items-center ">
              <div className=" h-[85%] overflow-auto">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">sr.No</TableCell>
                          <TableCell align="center">User</TableCell>
                          <TableCell align="right">Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {candidateData &&
                          candidateData.voters_id
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((data, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">
                                  {page * rowsPerPage + index + 1}
                                </TableCell>
                                <TableCell align="center">
                                  {data?.username}
                                </TableCell>
                                <TableCell align="right">
                                  {data?.updatedAt
                                    ? data?.updatedAt
                                        .split("T")[0]
                                        .substr(0, 15)
                                    : "NA"}
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[7, 15, 100]}
                    component="div"
                    count={candidateData.voters_id?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
              {/* <table>
              <thead>
                <tr>
                  <th>sr.No</th>
                  <th>UserName</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {candidateData &&
                  candidateData?.voters_id.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data?.username}</td>
                      <td>
                        {" "}
                        {data?.updatedAt
                          ? data?.updatedAt.split("T")[0].substr(0, 15)
                          : "NA"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Candidate;
