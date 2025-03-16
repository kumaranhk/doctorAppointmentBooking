import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import Loader from "../../components/Loader";

const Adminappointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    {
      id: "patient",
      label: "Patient",
      minWidth: 170,
      align: "center",
      format: (value) => value,
    },
    {
      id: "doctor",
      label: "Doctor",
      minWidth: 170,
      align: "center",
      format: (value) => `Dr. ${value}`,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "center",
      format: (value) =>
        value.split("T")[0] + " " + value.split("T")[1].slice(0, 5),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
      format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
  ];

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const req = await axios.get("/appointments", {
        params: {
          recordsPerPage: rowsPerPage,
          page,
        },
      });
      setAppointments(req.data.data);
      setTotalCount(req.data.totalCount);
      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleCancel = async (appointment) => {
    try {
      setShowLoader(true);
      const req = await axios.put(`/appointments/${appointment._id}`, {
        ...appointment,
        status: "cancelled",
      });
      setShowLoader(false);
      if (req.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" mb={4}>My Appointments</Typography>
      <Divider sx={{ mt: 1 }} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {showLoader ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <Loader />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align={"center"} style={{ minWidth: 150 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.format(value) || value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Tooltip title="Cancel Appointment">
                        <IconButton
                          onClick={() => handleCancel(row)}
                          disabled={row.status === "cancelled" ? true : false}
                        >
                          <DisabledByDefaultOutlinedIcon
                            sx={{
                              "&:hover": { color: "red" },
                              transition: "all 0.5s ease",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default Adminappointments;
