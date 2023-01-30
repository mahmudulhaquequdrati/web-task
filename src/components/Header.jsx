import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProfile } from "../hooks/userHook";
import { Link } from "react-router-dom";
import useCount from "../hooks/useCount";

const Header = () => {
  const { userProfile } = useProfile();
  const { totalAmount = 0 } = useCount();
  console.log(userProfile);
  const user = localStorage.getItem("authUser");
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 6rem",
          height: "70px",
          backgroundColor: "grey.300",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "1.5rem",
            fontWeight: "semibold",
          }}
        >
          Logo
        </Link>
        {user && (
          <Typography
            sx={{
              fontSize: "1.2rem",
            }}
          >
            Total amount: {totalAmount && totalAmount}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Header;
