import {
  TextField,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Button,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { React, useState } from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your new password
          </Typography>
          <Alert severity="success" sx={{ mb: 3, textAlign: "left" }}>
            <AlertTitle>Success</AlertTitle>
            This is a success Alert with an encouraging title.
          </Alert>
          <form>
            <TextField
              fullWidth
              label="New Password"
              placeholder="New Password"
              margin="normal"
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="Confirm Password"
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
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
              <Link to="/reset-password">Confirm</Link>
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

export default ResetPassword;
