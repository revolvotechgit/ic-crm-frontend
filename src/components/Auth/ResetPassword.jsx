import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://ic-crm-backend.onrender.com";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  // Redirect if no email or code
  if (!email || !code) {
    navigate("/forgot-password");
    return null;
  }

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (alert.show) setAlert({ ...alert, show: false });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, show: false });

    try {
      const { newPassword, confirmPassword } = formData;

      // Validate passwords
      if (!newPassword || !confirmPassword) {
        throw new Error("Both password fields are required");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!validatePassword(newPassword)) {
        throw new Error(
          "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters"
        );
      }

      const response = await axios.post("/auth/reset-password", {
        email,
        code,
        newPassword,
      });

      if (response.data.success) {
        setAlert({
          show: true,
          severity: "success",
          title: "Success",
          message: "Password reset successful! Redirecting to login...",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        title: "Error",
        message: error.response?.data?.message || error.message,
      });
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your new password
        </Typography>
      </Box>

      <Collapse in={alert.show}>
        <Alert
          severity={alert.severity}
          sx={{ mb: 2 }}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          placeholder="Enter new password"
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={formData.newPassword}
          onChange={handleChange}
          required
          error={alert.show && alert.severity === "error"}
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
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={alert.show && alert.severity === "error"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          disabled={
            loading || !formData.newPassword || !formData.confirmPassword
          }
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Remember your password?{" "}
            <Link
              to="/login"
              style={{ color: "#4f46e5", textDecoration: "none" }}
            >
              Back to Login
            </Link>
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default ResetPassword;
