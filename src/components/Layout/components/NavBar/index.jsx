import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { COLORS } from "constant/colors";
import { useAuthContext } from "context/authContext";

const NavBar = (props) => {
  const {
    title,
    onLogout,
    onDelete,
    setSearch,
    buttonText,
    onBackIcon,
    buttonClick,
    isHideNavbar,
    onAddCategory,
    searchInputTitle,
    onManageEquipment,
  } = props || {};

  const navigate = useNavigate();

  const context = useAuthContext();

  const user = context?.user;

  const [isLogout, setIsLogout] = React.useState(false);

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Box
          px={6}
          py={6}
          display={"flex"}
          alignItems={"center"}
          mt={{ xs: 1, md: 0, sm: 0 }}
          justifyContent={"space-between"}
        >
          <Box >
            
            <Typography variant="h4">{title}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: { md: 45, sm: 35, xs: 25 },
                height: { md: 45, sm: 35, xs: 25 },
              }}
              alt="user avatar"
              src={"/assets/images/user-icon.svg"}
            />
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              flexDirection={"column"}
              mx={2}
            >
              <Typography
                fontFamily="Mulish"
                fontWeight={"bold"}
                color={COLORS.black.main}
                fontSize={{ md: 16, sm: 14, xs: 12 }}
              >
                {user?.email}
              </Typography>
              <Typography
                variant="body2"
                color={COLORS.black.main}
                fontSize={{ md: 12, sm: 10, xs: 10 }}
              >
                @{user?.firstName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default NavBar;
