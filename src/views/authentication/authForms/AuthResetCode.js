import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const API_URL = 'http://localhost:3000';

const AuthResetCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (!storedEmail) {
      window.location.href = '/auth/forgot-password';
      return;
    }
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Trim any whitespace from the code
    const cleanCode = code.trim();

    // Debug log
    console.log('Sending verification request:', {
      email,
      code: cleanCode,
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/verify-reset-code`,
        {
          email,
          code: cleanCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      // Debug log
      console.log('Full server response:', response);

      if (response.data) {
        // Store both the token and the code
        if (response.data.token) {
          sessionStorage.setItem('resetToken', response.data.token);
          sessionStorage.setItem('resetCode', cleanCode);
        }
        window.location.href = '/auth/reset-password';
      }
    } catch (err) {
      // Detailed error logging
      console.error('Reset code error details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      if (err.response?.status === 400) {
        setError('Invalid or expired code. Please check the code and try again.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while verifying the code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fixed height container for error messages */}
      <Box minHeight="60px" mb={3}>
        {error && (
          <Alert
            severity="error"
            sx={{
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <AlertTitle>Verification Failed</AlertTitle>
            {error}
          </Alert>
        )}
      </Box>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="code">Reset Code</CustomFormLabel>
          <CustomTextField
            id="code"
            name="code"
            variant="outlined"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the code sent to your email"
          />
        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            sx={{ cursor: 'pointer' }}
            onClick={() => (window.location.href = '/auth/forgot-password')}
          >
            Didn't receive the code?
          </Typography>
        </Stack>

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading || !code.trim()}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default AuthResetCode;
