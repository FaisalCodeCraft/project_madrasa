import ROUTES from "constant/routes";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const SecureRoute = () => {
const isLoggedIn = true

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.AUTH.SIGN_IN} />
  );
};

export default SecureRoute;
