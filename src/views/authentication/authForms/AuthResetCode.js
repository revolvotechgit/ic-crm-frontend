import React, { useState } from 'react';
import { Box, Typography, Button, Stack, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthResetCode = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      setError('Email not found. Please start the reset process again.');
      setLoading(false);
      return;
    }

    try {
      // First verify the code
      const verifyResponse = await fetch('http://localhost:3000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        // If code is verified, reset the password
        const resetResponse = await fetch('http://localhost:3000/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code, newPassword }),
        });

        const resetData = await resetResponse.json();

        if (resetData.success) {
          sessionStorage.removeItem('resetEmail');
          navigate('/auth/login');
        } else {
          setError(resetData.message || 'Failed to reset password');
        }
      } else {
        setError(verifyData.message || 'Invalid code');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Box>
          <CustomTextField
            fullWidth
            id="code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            disabled={loading}
          />
        </Box>
        <Box>
          <CustomTextField
            fullWidth
            id="newPassword"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            disabled={loading}
          />
        </Box>
        {error && (
          <FormHelperText error>{error}</FormHelperText>
        )}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          textAlign="center"
          mt={2}
        >
          Didn't receive the code?{' '}
          <Button
            color="primary"
            onClick={() => navigate('/auth/forgot-password')}
            sx={{ textTransform: 'none' }}
          >
            Resend
          </Button>
        </Typography>
      </Stack>
    </form>
  );
};

export default AuthResetCode;
