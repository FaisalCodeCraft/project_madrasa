import * as React from "react";
import theme from "styles/theme";
import List from "@mui/material/List";
import ROUTES from "constant/routes";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { COLORS } from "constant/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "config/firerBase";
import { useAuthContext } from "context/authContext";

export const SideBar = (props) => {
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { pathname } = useLocation();

  const context =useAuthContext()

  const navigate = useNavigate();

  const isActiveDashboardURL = pathname === ROUTES.COMMON.DASHBOARD;

  const isActiveAdminURL = pathname === ROUTES.ADMIN.ADMINS;

  const isActiveSettingURL = pathname === ROUTES.COMMON.SETTINGS;

  const isActiveStudentURL = pathname === ROUTES.COMMON.STUDENTS;

  const isActiveTeacherURL = pathname === ROUTES.ADMIN.TEACHERS;
  const isActiveSign_inURL = pathname === ROUTES.AUTH.SIGN_IN;

  const logout=async()=>{
  try {
    await signOut(auth)
    context.signOut()
  } catch (error) {
    console.log(error)
  }
  // console.log(context?.user,"in side bar")
  }
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
            selected={isActiveAdminURL}
            onClick={() => navigate(ROUTES.ADMIN.ADMINS)}
          >
            <ListItemIcon>
              <PersonIcon
                sx={{
                  color: isActiveAdminURL
                    ? COLORS.primary.main
                    : COLORS.white.main,
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Admin</ListItemText>
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
            selected={isActiveTeacherURL}
            onClick={() => navigate(ROUTES.ADMIN.TEACHERS)}
          >
            <ListItemIcon>
              <AccountCircleIcon
                sx={{
                  color: isActiveTeacherURL
                    ? COLORS.primary.main
                    : COLORS.white.main,
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Teachers</ListItemText>
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
          <ListItemButton>
            <ListItemText
            selected={isActiveSign_inURL}
             onClick={logout}
             >
              Logout
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
