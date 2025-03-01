import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://ic-crm-backend.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    // Clear alerts when user starts typing
    if (alert.show) {
      setAlert({ ...alert, show: false });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showAlert = (severity, title, message) => {
    setAlert({
      show: true,
      severity,
      title,
      message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, show: false });

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        showAlert(
          "error",
          "Validation Error",
          "Email and password are required"
        );
        return;
      }

      const response = await axios.post("/auth/login", formData);

      if (response.data.success) {
        showAlert("success", "Success", "Login successful! Redirecting...");
        login({
          ...response.data.user,
          token: response.data.token,
        });

        // Delay navigation to show success message
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        showAlert(
          "error",
          "Login Failed",
          response.data.message || "An error occurred"
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during login";
      showAlert("error", "Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please sign in to continue
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
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          error={alert.show && alert.severity === "error" && !formData.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputLabel-root": {
              color: "text.secondary",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "divider",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          error={alert.show && alert.severity === "error" && !formData.password}
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

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#4f46e5", textDecoration: "none" }}
              sx={{ color: "primary.main" }}
            >
              Sign up
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Forgot password?{" "}
            <Link
              to="/forgot-password"
              style={{ color: "#4f46e5", textDecoration: "none" }}
            >
              Reset password
            </Link>
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default Login;
