import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Stack, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const API_URL = 'http://localhost:3000';

const AuthResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    // Check for both email and token
    const storedEmail = sessionStorage.getItem('resetEmail');
    const resetToken = sessionStorage.getItem('resetToken');
    
    console.log('Stored data:', { storedEmail, resetToken }); // Debug log

    if (!storedEmail || !resetToken) {
      console.log('Missing required data, redirecting...'); // Debug log
      window.location.href = '/auth/forgot-password';
      return;
    }

    // Get the code only if we have valid email and token
    const storedCode = sessionStorage.getItem('resetCode');
    if (!storedCode) {
      console.log('Missing reset code, redirecting...'); // Debug log
      window.location.href = '/auth/reset-code';
      return;
    }

    setEmail(storedEmail);
    setCode(storedCode);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/reset-password`,
        {
          email,
          code,
          newPassword: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (response.data) {
        // Clear stored reset data
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetCode');
        sessionStorage.removeItem('resetToken');
        
        // Redirect to login
        window.location.href = '/auth/login';
      }
    } catch (err) {
      console.error('Reset password error:', err.response || err);
      setError(err.response?.data?.message || 'Error resetting password');
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
            <AlertTitle>Reset Failed</AlertTitle>
            {error}
          </Alert>
        )}
      </Box>

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="password">New Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Box>

        <Box mt={3}>
          <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
          <CustomTextField
            id="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </Box>

        <Box mt={4}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading || !formData.password || !formData.confirmPassword}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default AuthResetPassword; 