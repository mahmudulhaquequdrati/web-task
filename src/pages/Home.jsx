import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

import ContactsIcon from "@mui/icons-material/Contacts";
import ModalComponent from "../components/Modal/Modal";
import TableComponent from "../components/table/TableComponent";
import Pagination from "@mui/material/Pagination";
import {
  deleteBilling,
  getAllBillings,
  getBillings,
} from "../helpers/api_helpers";
import useCount from "../hooks/useCount";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [billingList, setBillingList] = useState([]);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const { setTotalAmount } = useCount();

  const handleDelete = (id) => {
    deleteBilling(id).then((res) => {
      if (res.message === "Billing deleted successfully") {
        getBillings(page, pageSize).then((res) => {
          setBillingList(res.data);
        });

        getAllBillings().then((res) => {
          const current = res.data.reduce((a, b) => a + b.payable, 0);

          setTotalAmount(current);
        });
      }
    });
  };

  useEffect(() => {
    getBillings(page, pageSize).then((res) => {
      setBillingList(res.data);
      const count = parseInt(res.total);
      const pageNumber = Math.ceil(count / pageSize);
      setCount(pageNumber);
    });
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          mt: "2rem",
          alignItems: "center",
          pl: "3rem",
          pr: "0.3rem",
          gap: "1rem",
          py: "0.5rem",
          backgroundColor: "#E0E0E0",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography>Billings</Typography>
          <input
            style={{
              width: "15rem",
              height: "2rem",
              outline: "none",
              padding: "0.5rem",
            }}
            placeholder="Search"
            onChange={(e) => {
              if (e.target.value === "") {
                getBillings(page, pageSize).then((res) => {
                  setBillingList(res.data);
                });
                return;
              }
              const filteredData = billingList.filter((item) => {
                return (
                  item.name.toLowerCase().includes(e.target.value) ||
                  item.email.toLowerCase().includes(e.target.value) ||
                  item.phone.toLowerCase().includes(e.target.value)
                );
              });
              setBillingList(filteredData);
            }}
          />
        </Box>
        <Box>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "grey.800",
              color: "#fff",
              width: "8rem",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "grey.900",
              },
            }}
          >
            Add Bill
            <ContactsIcon
              sx={{
                ml: "0.5rem",
                fontSize: "1rem",
              }}
            />
          </Button>
        </Box>
      </Box>
      <TableComponent
        billingList={billingList}
        handleDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        setBillingList={setBillingList}
        setLoading={setLoading}
        loading={loading}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "1rem",
          mb: 3,
        }}
      >
        <Pagination
          count={count ? count : 1}
          color="primary"
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </Box>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        type={"add"}
        data={""}
        page={page}
        pageSize={pageSize}
        setBillingList={setBillingList}
        setLoading={setLoading}
      />
    </Container>
  );
};

export default Home;
