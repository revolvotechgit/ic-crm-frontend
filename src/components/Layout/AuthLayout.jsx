import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";

const AuthLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      {/* Logo in the corner */}
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          width: "120px",
        }}
      >
        <Link to="/">
          <img
            src={logo}
            style={{
              filter: `brightness(0) saturate(100%) ${
                theme.palette.mode === "dark"
                  ? `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)`
                  : `invert(24%) sepia(90%) saturate(6619%) hue-rotate(242deg) brightness(97%) contrast(91%)`
              }`,
              width: "100%",
              height: "auto",
            }}
            alt="Company Logo"
          />
        </Link>
      </Box>

      {/* Main content */}
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: 8,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
