import React, { FC, ReactNode } from "react";
import Box from "@mui/system/Box";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { COLORS } from "constant/colors";
import { Container } from "@mui/material";

// type Props = {
//   children: ReactNode;
// };

const Layout = (props) => {
  const { children ,title} = props || {};

  const [isSideBarOpen, setSideBarOpen] = React.useState(false);

  const handleSideBarToggle = () => setSideBarOpen(!isSideBarOpen);

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        component="nav"
        sx={{ width: { md: 200, sm: 200 }, flexShrink: { sm: 0 } }}
      >
        <SideBar open={isSideBarOpen} onClose={handleSideBarToggle} />
      </Box>

      <Box sx={{ position: "absolute", display: { sm: "none", xs: "block" } }}>
        <IconButton
          color="secondary"
          aria-label="open sidebar"
          onClick={handleSideBarToggle}
        >
          <MenuIcon sx={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Box>
      <Box bgcolor={COLORS.secondary.lightest} width={"100%"}>
        <NavBar title={title}/>
        <Container maxWidth={false}>
          <Box mx={6}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
