import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", sm: "8rem" },
          fontWeight: "bold",
          color: "primary.main",
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: "text.primary",
        }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          color: "text.secondary",
          maxWidth: "600px",
        }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 4,
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Redirecting to home page in 3 seconds...
      </Typography>
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate("/")}
        size="large"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
