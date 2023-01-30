import React, { useEffect, useReducer, useState } from "react";
import { Typography, Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useProfile } from "../../hooks/userHook";
import {
  addBillings,
  getAllBillings,
  getBillings,
  updateBilling,
} from "../../helpers/api_helpers";
import useCount from "../../hooks/useCount";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: "50%", md: "50%" },
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 5,
  zIndex: 1000,
  borderRadius: "0.3rem",
};
const ModalComponent = ({
  open,
  handleClose,
  type,
  data,
  page,
  pageSize,
  setBillingList,
  billingList,
  setLoading = () => {},
}) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    payable: "",
  };
  useEffect(() => {
    if (type === "edit") {
      dispatch({ type: "name", payload: data.name });
      dispatch({ type: "email", payload: data.email });
      dispatch({ type: "phone", payload: data.phone });
      dispatch({ type: "payable", payload: data.payable });
    }
  }, [data]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "name":
        return {
          ...state,
          name: action.payload,
        };
      case "email":
        return {
          ...state,
          email: action.payload,
        };
      case "phone":
        return {
          ...state,
          phone: action.payload,
        };
      case "payable":
        return { ...state, payable: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { userProfile } = useProfile();
  const { setTotalAmount } = useCount();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (
      state.name === "" ||
      state.email === "" ||
      state.phone === "" ||
      state.payable === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (state.phone.length !== 11) {
      alert("Please enter a valid phone number");
      return;
    }
    if (type === "add") {
      setLoading(true);
      if (userProfile.token) {
        setBillingList((prev) => [...prev, state]);
        handleClose();

        addBillings(state)
          .then((res) => {
            if (res.data) {
              getBillings(page, pageSize).then((res) => {
                setBillingList(res.data);
              });
              getAllBillings().then((res) => {
                const current = res.data.reduce((a, b) => a + b.payable, 0);
                setTotalAmount(current);
              });

              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(true);

            handleClose();
            // for testing purposes that it is working propoerly
            setTimeout(() => {
              alert(err + " " + "The request failed, please try again");
              setLoading(false);
              getBillings(page, pageSize).then((res) => {
                setBillingList(res.data);
              });
            }, 2000);
          });
      }
      return;
    }
    if (type === "edit" && userProfile.token) {
      updateBilling(data._id, state).then((res) => {
        console.log(res);

        getBillings(page, pageSize).then((res) => {
          setBillingList(res.data);
        });
        getAllBillings().then((res) => {
          const current = res.data.reduce((a, b) => a + b.payable, 0);

          setTotalAmount(current);
        });
        handleClose();
      });
    }
  };
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {type === "add" ? "Add more bills here" : "Edit bill here"}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    mb: "0.5rem",
                  }}
                >
                  Full Name
                </Typography>
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your name..."
                  defaultValue={type === "edit" ? data.name : ""}
                  required
                  onChange={(e) => {
                    dispatch({ type: "name", payload: e.target.value });
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    mb: "0.5rem",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  type="email"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your email..."
                  defaultValue={type === "edit" ? data.email : ""}
                  required
                  onChange={(e) => {
                    dispatch({ type: "email", payload: e.target.value });
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                mt: 3,
              }}
            >
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    mb: "0.5rem",
                  }}
                >
                  Phone Number
                </Typography>
                <TextField
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your Phone Number..."
                  defaultValue={type === "edit" ? data.phone : ""}
                  required
                  onChange={(e) => {
                    dispatch({ type: "phone", payload: e.target.value });
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                }}
              >
                <Typography
                  sx={{
                    mb: "0.5rem",
                  }}
                >
                  Payable Amount
                </Typography>
                <TextField
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Payable Amount..."
                  defaultValue={type === "edit" ? data.payable : ""}
                  required
                  onChange={(e) => {
                    dispatch({ type: "payable", payload: e.target.value });
                  }}
                />
              </Box>
            </Box>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
                mt: "1.5rem",
                width: "8rem",
                fontSize: "0.9rem",
                py: "0.5rem",
                float: "right",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;
