import React from "react";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: "100vh", 
      position: "relative",
      bgcolor: 'background.default'
    }}>
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
            src="https://img.logoipsum.com/243.svg"
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
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