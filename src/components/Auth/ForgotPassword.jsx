import React, { useState } from "react";
import {
  TextField,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Button,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import { Mail } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://ic-crm-backend.onrender.com/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    title: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ ...alert, show: false });

    try {
      if (!email) {
        setAlert({
          show: true,
          severity: "error",
          title: "Error",
          message: "Email is required",
        });
        return;
      }

      const response = await axios.post("/auth/forgot-password", { email });

      if (response.data.success) {
        setAlert({
          show: true,
          severity: "success",
          title: "Success",
          message: "Reset code sent to your email",
        });

        // Delay navigation to show success message
        setTimeout(() => {
          navigate("/reset-code", { state: { email } });
        }, 1500);
      }
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        title: "Error",
        message: error.response?.data?.message || "Failed to send reset code",
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
          Enter your email to receive a reset code
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
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (alert.show) setAlert({ ...alert, show: false });
          }}
          margin="normal"
          required
          error={alert.show && alert.severity === "error"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail color="action" />
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
          {loading ? "Sending..." : "Send Reset Code"}
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

export default ForgotPassword;
