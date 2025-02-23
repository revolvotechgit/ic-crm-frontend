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
} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    navigate("/");
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
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
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
        >
          Sign In
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
