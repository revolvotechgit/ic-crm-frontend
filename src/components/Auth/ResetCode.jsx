import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useState, useRef } from "react";

const ResetCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

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
      inputRefs.current[index - 1]?.focus(); // Move back on delete
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      console.log("Reset Code Submitted:", enteredCode);
      alert("Code submitted successfully!");
    } else {
      alert("Please enter all 6 digits!");
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter the 6-digit code sent to your email address
        </Typography>
      </Box>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {code.map((num, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={num}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              variant="outlined"
              size="small"
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "2.5rem",
                },
              }}
            />
          ))}
        </Box>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default ResetCode;
