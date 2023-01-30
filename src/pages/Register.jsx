import React, { useReducer } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../helpers/api_helpers";

const Register = () => {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "fullName":
        return { ...state, fullName: action.value };
      case "email":
        return { ...state, email: action.value };
      case "password":
        return { ...state, password: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.fullName && state.email && state.password) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
        alert("Email must be valid");
        return;
      }
      if (state.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
      // send data to server
      registerUser(state).then((res) => {
        if (res?.data?.token) {
          navigate("/login");
        }
      });
    } else {
      alert("All fields are required");
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          mt: "3rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "primary.main",
        }}
        onClick={() => {
          localStorage.setItem("authUser", true);
        }}
      >
        Register Form Here
      </Typography>
      <Box
        sx={{
          mt: "2rem",
          width: 400,
          mx: "auto",
        }}
      >
        <TextField
          sx={{
            width: "25rem",
            mt: "1rem",
          }}
          variant="outlined"
          label="Full Name"
          type={"text"}
          required
          onChange={(e) =>
            dispatch({ type: "fullName", value: e.target.value })
          }
        />
        <TextField
          sx={{
            width: "25rem",
            mt: "1rem",
          }}
          variant="outlined"
          label="Email"
          type={"email"}
          required
          onChange={(e) => dispatch({ type: "email", value: e.target.value })}
        />
        <TextField
          sx={{
            width: "25rem",
            mt: "1rem",
          }}
          variant="outlined"
          label="Password"
          type={"password"}
          required
          onChange={(e) =>
            dispatch({ type: "password", value: e.target.value })
          }
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            mt: "1rem",
            width: "25rem",
            backgroundColor: "primary.main",
            color: "#fff",
            fontSize: "1rem",
            py: 1,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          Register
        </Button>

        <Typography
          sx={{
            mt: "1rem",
            textAlign: "center",
            fontSize: "1rem",
            color: "primary.main",
            fontWeight: "semibold",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1565c0",
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
