import * as React from "react";
import theme from "styles/theme";
import List from "@mui/material/List";
import ROUTES from "constant/routes";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { COLORS } from "constant/colors";
import { useLocation, useNavigate } from "react-router-dom";

export const SideBar = (props) => {
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isActiveDashboardURL = pathname === ROUTES.COMMON.DASHBOARD;

  const isActiveSettingURL = pathname === ROUTES.COMMON.SETTINGS;

  const isActiveStudentURL = pathname === ROUTES.COMMON.STUDENTS;

  const isActiveSign_inURL = pathname === ROUTES.AUTH.SIGN_IN;


  return (
    <Drawer variant={isSmUp ? "permanent" : "temporary"} {...props}>
      <List className="MuiList-sideBar-menu">
        <ListItem sx={{ textAlign: "center", my: 4 }}>
          <ListItemText>
            <img
              style={{ width: "50px", height: "50px" }}
              src="/assets/icons/logo.jpg"
              alt="dashboard-logo"
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={isActiveDashboardURL}
            onClick={() => navigate(ROUTES.COMMON.DASHBOARD)}
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  color: isActiveDashboardURL
                    ? COLORS.primary.main
                    : COLORS.white.main,
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={isActiveStudentURL}
            onClick={() => navigate(ROUTES.COMMON.STUDENTS)}
          >
            <ListItemIcon>
              <AccountCircleIcon
                sx={{
                  color: isActiveStudentURL
                    ? COLORS.primary.main
                    : COLORS.white.main,
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Student</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            selected={isActiveSettingURL}
            onClick={() => navigate(ROUTES.COMMON.SETTINGS)}
          >
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  color: isActiveSettingURL
                    ? COLORS.primary.main
                    : COLORS.white.main,
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider  sx={{ mt: 4,backgroundColor:'white' }} />
        <ListItem>
          <ListItemButton
           selected={isActiveSign_inURL}
           onClick={() => navigate(ROUTES.AUTH.SIGN_IN)}>
            <ListItemText>
              Logout
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
