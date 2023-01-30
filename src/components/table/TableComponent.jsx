import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { Button, Typography } from "@mui/material";
import ModalComponent from "../Modal/Modal";

const TableComponent = ({
  billingList,
  handleDelete,
  page,
  pageSize,
  setBillingList,
  setLoading,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const handleOpen = (data) => {
    setOpen(true);
    setUserData(data);
  };
  const handleClose = () => setOpen(false);

  return (
    <TableContainer
      component={Paper}
      sx={{
        my: "2rem",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "grey.300",
          }}
        >
          <TableRow>
            <TableCell>Billing ID</TableCell>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Paid Amount</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {billingList?.map((data, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data?._id ? data?._id : "billing id is genrating"}
              </TableCell>
              <TableCell align="left">{data?.name}</TableCell>
              <TableCell align="left">{data?.email}</TableCell>
              <TableCell align="left">{data?.phone}</TableCell>
              <TableCell align="left">{data?.payable}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "primary.light",
                    mr: "0.5rem",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                  onClick={() => handleOpen(data)}
                >
                  Edit
                </Button>
                <Button
                  sx={{
                    backgroundColor: "error.light",
                    color: "#fff",
                    px: "1rem",
                    "&:hover": {
                      backgroundColor: "error.main",
                    },
                  }}
                  onClick={() => handleDelete(data?._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        type={"edit"}
        data={userData}
        page={page}
        pageSize={pageSize}
        setBillingList={setBillingList}
        billingList={billingList}
        setLoading={setLoading}
      />
    </TableContainer>
  );
};

export default TableComponent;
