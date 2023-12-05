import { createTheme } from "@mui/material/styles";
import { COLORS } from "constant/colors";

export let theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary.main,
    },

    secondary: {
      main: COLORS.primary.main,
    },

    success: {
      main: COLORS.success.main,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          "::-webkit-scrollbar": {
            display: "none !important",
          },
          borderRight: 0,
          "& .MuiListItem-root": {
            "& .MuiListItemButton-root": {
              padding: theme.spacing(0.5, 1),
              margin: theme.spacing(0.5, 0),
              background: "transparent",
              "&:hover": {
                color: COLORS.black.main,
                fontWeight: theme.typography.fontWeightBold,
                background: COLORS.white.main,
                borderRadius: "5px",
              },
            },
            "& .MuiListItemButton-root.Mui-selected": {
              color: COLORS.black.main,
              fontWeight: theme.typography.fontWeightBold,
              background: COLORS.white.main,
              borderRadius: "5px",
              borderRight: `5px solid ${theme.palette.primary.main}`,
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
            outline: "green",
          },
          "&:hover": {
            boxShadow: "none",
          },
          "&.MuiButton-light": {
            backgroundColor: COLORS.grey.lightest,
            color: COLORS.grey.dark,
          },
          "&.MuiButton-dark": {
            backgroundColor: "#000",
            color: "white",
          },
        },
        outlined: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "white",
            borderColor: "black",
          },
          "&.MuiButton-selected": {
            borderRadius: 20,
            borderColor: "black",
            color: "black",
          },
          "&.MuiButton-unSelected": {
            borderRadius: 20,
            backgroundColor: "black",
            color: "white",
            borderColor: "black",
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          "&.MuiList-sideBar-menu": {
            backgroundColor: COLORS.primary.main,
            color: COLORS.white.main,
            width: 200,
            minHeight: "100vh",
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {},
        indicator: {
          display: "none",
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          "&.MuiAvatar-student-logo": {
            border: `3px solid ${theme.palette.primary.main}`,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiPaper-auth-form": {
            borderRadius: "20px",
            padding: "40px",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 0,
          "&.MuiTableCell-tableHead": {
            fontSize: "13px",
            height:"45px",
            fontWeight: 550,
            textTransform: "uppercase",
            backgroundColor: COLORS.primary.main,
            color: COLORS.white.main,
          },
        },
      },
    },
  },
};

export default theme;
