import React, { useReducer } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllBillings,
  loginUser,
  setAuthorization,
} from "../helpers/api_helpers";
import useCount from "../hooks/useCount";

const Login = () => {
  const { setTotalAmount } = useCount();
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
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
    if (state.email && state.password) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
        alert("Email must be valid");
        return;
      }
      if (state.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
      // send data to server
      loginUser(state).then((res) => {
        if (res?.data?.token) {
          localStorage.setItem("authUser", JSON.stringify(res.data));
          setAuthorization(res?.data?.token);
          getAllBillings().then((res) => {
            const current = res.data.reduce((a, b) => a + b.payable, 0);
            console.log(current);
            setTotalAmount(current);
          });
          navigate("/");
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
      >
        Login Form Here
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
          }}
          variant="outlined"
          label="Email"
          required
          type={"email"}
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
          Submit
        </Button>

        <Typography
          sx={{
            textAlign: "center",
            mt: "1rem",
            fontSize: "1rem",
            fontWeight: "semibold",
            color: "primary.light",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1565c0",
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
