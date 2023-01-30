import React from "react";
import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mt: "3rem",
        }}
      >
        The page you are looking for does not exists.
      </Typography>
    </div>
  );
};

export default NotFound;
