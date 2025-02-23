import {
  TextField,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Button,
} from "@mui/material";
import { Mail } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your email to continue
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Email"
              placeholder="Email"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail color="action" />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              <Link to="/reset-code">Send reset code</Link>
            </Button>
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Go to login page?{" "}
                <Link
                  to="/login"
                  style={{ color: "#4f45e5", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  );
};

export default ForgotPassword;
