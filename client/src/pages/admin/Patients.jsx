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

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
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
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
      format: (value) => value,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
      format: (value) => value,
    },
    {
      id: "gender",
      label: "Gender",
      minWidth: 170,
      align: "center",
      format: (value) =>
        value,
    },
    {
      id: "address",
      label: "adress",
      minWidth: 170,
      align: "center",
      format: (value) => value == "" ? 'NA' : value,
    },
  ];

  const fetchData = async () => {
    try {
      setShowLoader(true);
      const req = await axios.get("/users", {
        params: {
          recordsPerPage: rowsPerPage,
          page,
          role : 'patient'
        },
      });
      setPatients(req.data.data);
      setTotalCount(req.data.totalCount);
      setShowLoader(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" mb={4}>
        All Patients
      </Typography>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.format(value) || value}
                        </TableCell>
                      );
                    })}
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

export default AdminPatients;
