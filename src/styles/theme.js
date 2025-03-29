import { createTheme } from "@mui/material/styles";

const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5",
      lighter: "rgba(79, 70, 229, 0.1)",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "inherit", // use the same font as your sidebar
    h4: {
      fontWeight: 600,
      color: "#1e293b",
    },
    h6: {
      color: "#1e293b",
    },
    subtitle2: {
      color: "#64748b",
    },
  },
  shape: {
    borderRadius: 8, // matches your sidebar's border radius
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(0px)",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "grey.100",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "background.paper",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "grey.100",
            borderTop: "1px solid",
            borderColor: "divider",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          backgroundImage: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 5,
          backgroundColor: "#e2e8f0",
        },
        bar: {
          backgroundColor: "#4f46e5",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      lighter: "rgba(99, 102, 241, 0.1)",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },
  typography: {
    fontFamily: "inherit",
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(0px)",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "grey.800",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "background.paper",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "grey.800",
            borderTop: "1px solid",
            borderColor: "divider",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          backgroundImage: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 5,
        },
      },
    },
  },
};

const commonStyles = {
  typography: {
    fontFamily: "inherit",
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "inherit",
            backgroundImage: "none",
          },
          "& .MuiDataGrid-cell": {
            "&:focus": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "action.hover",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
    },
  },
};

const theme = createTheme({
  ...commonStyles,
  ...(localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme),
});

export default theme;
