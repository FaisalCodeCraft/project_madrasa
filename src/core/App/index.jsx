import React from "react";
import "../../styles/_main.css";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../styles/theme";
import Routers from "../Routers";
import { AuthContext } from "context/authContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <Routers />
      </AuthContext>
    </ThemeProvider>
  );
};

export default App;
