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

    const cleanCode = code.trim();

    try {
      console.log('Sending request:', {
        url: `${API_URL}/api/auth/verify-reset-code`,
        data: { email, code: cleanCode },
      });

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

      console.log('Full response:', response); // Log the full response

      if (response.data && response.data.success) {
        // Store all necessary data
        const token = response.data.token || 'temporary-token';
        sessionStorage.setItem('resetToken', token);
        sessionStorage.setItem('resetCode', cleanCode);

        // Verify storage before redirect
        const verifyStorage = {
          token: sessionStorage.getItem('resetToken'),
          code: sessionStorage.getItem('resetCode'),
          email: sessionStorage.getItem('resetEmail'),
        };
        console.log('Verification before redirect:', verifyStorage);

        // Add a small delay before redirect
        setTimeout(() => {
          window.location.href = '/auth/reset-password';
        }, 100);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Reset code error:', err.response || err);

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
