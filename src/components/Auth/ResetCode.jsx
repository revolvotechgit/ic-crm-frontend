import { useState, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://ic-crm-backend.onrender.com/api";

const ResetCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    title: "",
    message: "",
  });
  const inputRefs = useRef([]);

  // Redirect if no email
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus(); // Move back on delete
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetCode = code.join("");

    if (resetCode.length !== 6) {
      setAlert({
        show: true,
        severity: "error",
        title: "Error",
        message: "Please enter all 6 digits",
      });
      return;
    }

    setLoading(true);
    setAlert({ ...alert, show: false });

    try {
      const response = await axios.post("/auth/verify-reset-code", {
        email,
        code: resetCode,
      });

      if (response.data.success) {
        setAlert({
          show: true,
          severity: "success",
          title: "Success",
          message: "Code verified successfully",
        });

        // Store the reset token
        localStorage.setItem("resetToken", response.data.resetToken);

        // Navigate to reset password page after showing success message
        setTimeout(() => {
          navigate("/reset-password", {
            state: {
              email,
              code: resetCode,
            },
          });
        }, 1500);
      }
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        title: "Error",
        message: error.response?.data?.message || "Invalid or expired code",
      });
      // Clear the code fields on error
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enter Reset Code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter the 6-digit code sent to {email}
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="outlined"
              size="small"
              autoComplete="off"
              error={alert.show && alert.severity === "error"}
              disabled={loading}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "2.5rem",
                  padding: "0.5rem",
                },
              }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || code.includes("")}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Didn't receive the code?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/forgot-password")}
              sx={{ textTransform: "none" }}
            >
              Request again
            </Button>
          </Typography>
        </Box>
      </form>
    </Paper>
  );
};

export default ResetCode;
