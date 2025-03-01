import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import {
  Mail,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://ic-crm-backend.onrender.com";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
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
      if (
        !formData.email ||
        !formData.password ||
        !formData.firstName ||
        !formData.lastName
      ) {
        showAlert("error", "Validation Error", "All fields are required");
        return;
      }

      const response = await axios.post("/auth/register", formData);

      if (response.data.success) {
        showAlert(
          "success",
          "Success",
          "Registration successful! Redirecting to login..."
        );

        // Delay navigation to show success message
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during registration";
      showAlert("error", "Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get started with your free account
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  error={
                    alert.show &&
                    alert.severity === "error" &&
                    !formData.firstName
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  error={
                    alert.show &&
                    alert.severity === "error" &&
                    !formData.lastName
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

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
              error={
                alert.show && alert.severity === "error" && !formData.email
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail color="action" />
                  </InputAdornment>
                ),
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
              error={
                alert.show && alert.severity === "error" && !formData.password
              }
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#4f46e5", textDecoration: "none" }}
                >
                  Sign in
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
      </Box>
    </Container>
  );
};

export default Register;
