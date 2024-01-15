import { Box, CircularProgress, Typography } from "@mui/material";
import ROUTES from "constant/routes";
import { useAuthContext } from "context/authContext";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const SecureRoute = () => {

  const context = useAuthContext()

  if (context.isLoading === true) {
    return <Box textAlign={"center"} >
      <CircularProgress />
    <Typography>Loading...</Typography>
    </Box>
  }
  return context?.user ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.AUTH.SIGN_IN} />
  );
};

export default SecureRoute;
