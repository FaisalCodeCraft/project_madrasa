import React from "react";
import Box from "@mui/system/Box";
import LoginForm from "./components/LoginForm";
import { COLORS } from "constant/colors";

// type Props = {};

const ManageAuth = (props) => {

  return (
    <Box
      sx={{
        backgroundColor: COLORS.primary.main,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box mt={6}>
        <img style={{width:'200px',height:'200px',borderRadius:'50%'}}  src="/assets/icons/logo.jpg" alt="dashboard-logo" />
      </Box>
      <Box mt={2} mb={15} p={1}>
         <LoginForm  /> 
      </Box>
    </Box>
  );
};

export default ManageAuth;
