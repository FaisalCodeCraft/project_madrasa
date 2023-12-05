import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { COLORS } from "constant/colors";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/authContext";
import TeacherForm from "pages/ManageTeacher/components/TeacherForm";

const NavBar = (props) => {
  const { title, onLogout, buttonText, onBackIcon, buttonClick } = props || {};

  const context = useAuthContext();

  const user = context?.user;

  const navigate = useNavigate();

  const [isLogout, setIsLogout] = React.useState(false);

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Box
          px={6}
          py={6}
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"center"}
          mt={{ xs: 1, md: 0, sm: 0 }}
          justifyContent={"space-between"}
        >
          <Box>
            {!!onBackIcon && (
              <ArrowBackIosNewIcon
                onClick={onBackIcon}
                sx={{ cursor: "pointer" }}
                fontSize="small"
              />
            )}
            {!!title && (
              <Typography variant="h4" fontWeight={"bold"}>
                {title}
              </Typography>
            )}
            {!!buttonClick && (
              <Button
                onClick={buttonClick}
                sx={{ px: 5, py: 1 }}
                variant="contained"
              >
                {buttonText}
              </Button>
            )}
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
