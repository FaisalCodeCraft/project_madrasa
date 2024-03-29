import { Box, CircularProgress, Typography } from "@mui/material";
import ROUTES from "constant/routes";
import { useAuthContext } from "context/authContext";
import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const SecureRoute = () => {
  
  const context = useAuthContext()



  if (context.isLoading === true) {
    return <Box
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      sx={{ transform: "translate(-50% , -50%)" }}
    >
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  }
  return context?.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.AUTH.SIGN_IN} />
  );
};

export default SecureRoute;
